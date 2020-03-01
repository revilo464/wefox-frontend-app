import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// TODO: import PropTypes from "prop-types";

import Nav from './components/Nav';
import Posts from './components/Posts';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';

import { listPosts, createPost } from './api/PostAPI';
import { fetchReducer } from './api/FetchReducer';
import { Post } from './types/PostType';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [fetchState, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    apiData: {}
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({ title: 'Test Create', content: 'Testing create functions' }); // TODO: remove this
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState(0);


  // setPosts(fetchState.data);
  
  // const getPosts = () => posts; // TODO: use this for more advanced state setting or discard
  // const { fetchData, postData } = PostAPI({getPosts, setPosts, setIsLoading, setErrors});

  useEffect(() => {
    listPosts(dispatch, setPosts);
  }, []); // TODO: should we depend on this for reload?

  function handlePostClick(postId: number | undefined) {
    if(postId !== undefined) {
      setCurrentPostId(postId);
    }
  }

  function handleNewPostClick() {
    setIsCreatingPost(true);
  }

  function handleNewPostSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    createPost(dispatch, post);
    listPosts(dispatch, setPosts);
    if (!fetchState.isError) {
      setIsCreatingPost(false);
    }
    // TODO: more error handling
  }

  function handleNewPostCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setPost({ title: "", content: ""});
    setIsCreatingPost(false);
  }

  function handleNewPostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="App">
      <Nav/>
      <main className="my-3 py-5">
        <Container fluid={true}>
          <Row>
            <Col md={5} className="overflow-auto p-3">
              <Container className="bordered-container p-3">
                <Posts
                  posts={posts}
                  handlePostClick={handlePostClick}
                  handleNewPostClick={handleNewPostClick}
                />
              </Container>
            </Col>
            <Col md={7} className="p-3">
              {!fetchState.isLoading && (isCreatingPost || posts.length === 0) &&
                <Container className="bordered-container p-3">
                  <PostEdit
                    post={post}
                    handleChange={handleNewPostChange}
                    handleNewPostSubmit={handleNewPostSubmit}
                    handleNewPostCancel={handleNewPostCancel}
                  />
                </Container>
              }
              {!isCreatingPost && posts.length > 0 &&
                <Container className="bordered-container p-3">
                  <PostView post={posts[currentPostId]} />
                </Container>
              }
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
