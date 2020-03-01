import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
// TODO: import PropTypes from "prop-types";

import Nav from './components/Nav';
import Posts from './components/Posts';
import PostView from './components/PostView';

import { Post, PostJSON, decodePost } from './types/PostType';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasErrors, setErrors] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostId, setCurrentPostId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get<PostJSON[]>('https://wf-challenge-d6haqugtoo.herokuapp.com/api/v1/posts')
        .then((response) => {
          setPosts(response.data.map(decodePost))
        })
        .catch((error) => {
          setErrors(error);
        });
    };
    fetchData();
  }, [currentPostId]); // should we depend on this for reload?

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
