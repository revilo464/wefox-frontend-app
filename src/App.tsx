import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// TODO: import PropTypes from "prop-types";

import Nav from './components/Nav';
import Posts from './components/Posts';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';

import PostAPI from './api/PostAPI';
import { Post } from './types/PostType';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasErrors, setErrors] = useState(false); // TODO: test here
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({ title: 'Test Create', content: 'Testing create functions' }); // TODO: remove this
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState(0);
  const getPosts = () => posts; // TODO: use this for more advnaced state setting or discard
  let postAPI = PostAPI({getPosts, setPosts, setIsLoading, setErrors});

  useEffect(() => {
    postAPI.fetchData();
  }, [postAPI, currentPostId]); // TODO: should we depend on this for reload?

  function handlePostClick(postId: number | undefined) {
    if(postId !== undefined) {
      setCurrentPostId(postId);
    }
  }

  function handleNewPostClick() {
    setIsCreatingPost(true);
  }

  function handleNewPostSubmit() {
    postAPI.postData();
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
              {!isLoading && (isCreatingPost || posts.length === 0) &&
                <Container className="bordered-container p-3">
                  <PostEdit
                    post={post}
                    handleChange={handleNewPostChange}
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
