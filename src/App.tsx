import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// TODO: import PropTypes from "prop-types";

import Nav from './components/Nav';
import Posts from './components/Posts';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';

import { listPosts, createPost, removePost } from './api/PostAPI';
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
  const [post, setPost] = useState<Post>({ title: '', content: '' });
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState(0);

  useEffect(() => {
    listPosts(dispatch, setPosts);
  }, []);
  
  if (!fetchState.isLoading && currentPostId > posts.length - 1) {
    setCurrentPostId(posts.length - 1);
  }

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
    createPost(dispatch, post)
      .then(() => {
        if (!fetchState.isError) {
          setIsCreatingPost(false);
          console.log(posts.length)
        }
        listPosts(dispatch, setPosts)
          .then(() => {
            setCurrentPostId(posts.length)
            console.log(posts.length)
          });
      }
    );
    
    // TODO: more error handling
  }

  function handleNewPostCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setPost({ title: "", content: ""});
    setIsCreatingPost(false);
  }

  function handleNewPostChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'lat' || e.target.name === 'long') {
      setPost({
        ...post,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else {
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handlePostDelete(id:number | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (id) {
      removePost(dispatch, id)
        .then((r) => 
          listPosts(dispatch, setPosts)
        );
    }
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
              {!fetchState.isLoading && !isCreatingPost && posts.length > 0 &&
                <Container className="bordered-container p-3">
                  <PostView
                    post={posts[currentPostId]}
                    handlePostDelete={handlePostDelete}
                  />
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
