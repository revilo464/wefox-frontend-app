import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
// TODO: import PropTypes from "prop-types";

import Nav from './components/Nav';
import Posts, { Post } from './components/Posts';
import PostView from './components/PostView';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [hasErrors, setErrors] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostId, setCurrentPostId] = useState(0);

  const fetchData = async () => {
    const res = await fetch("https://wf-challenge-d6haqugtoo.herokuapp.com/api/v1/posts");
    res.json()
      .then(res => setPosts(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handlePostClick(postId: number | undefined) {
    if(postId !== undefined) {
      setCurrentPostId(postId);
    }
  }

  return (
    <div className="App">
      <Nav/>
      <main className="my-3 py-5">
        <Container fluid={true}>
          <Row>
            <Col md={5} className="overflow-auto">
              <ListGroup>
                <Posts posts={posts} handlePostClick={handlePostClick} />
              </ListGroup>
            </Col>
            <Col md={7}>
              {posts.length > 0 && <PostView post={posts[currentPostId]} />}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
