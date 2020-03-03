import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Nav from './components/Nav';
import Posts from './components/Posts';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';

import { listPosts, createPost, updatePost, removePost } from './api/PostAPI';
import { fetchReducer } from './api/FetchReducer';
import { Post } from './types/PostType';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LoadScript } from '@react-google-maps/api';

function App() {

  const [fetchState, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    apiData: {}
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({ title: '', content: '' });
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [isEditingExistingPost, setIsEditingExistingPost] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState(0);

  useEffect(() => {
    listPosts(dispatch, setPosts);
  }, []);
  
  if (!fetchState.isLoading && currentPostId > posts.length - 1) {
    setCurrentPostId(posts.length - 1);
  }

  function handlePostClick(postId: number | undefined) {
    if(postId !== undefined) {
      setIsCreatingPost(false);
      setIsEditingExistingPost(false);
      setCurrentPostId(postId);
    }
  }

  function handleNewPostClick() {
    setIsCreatingPost(true);
  }

  function handlePostSubmit() {
    let apiFn = !isEditingExistingPost ? createPost : updatePost;
    apiFn(dispatch, post)
      .then(() => {
        if (!fetchState.isError) {
          setIsCreatingPost(false);
          setIsEditingExistingPost(false);
        }
        listPosts(dispatch, setPosts)
          .then(() => {
            setCurrentPostId(posts.length);
            setPost({ title: '', content: '' });
          });
      }
    );
  }

  function handleNewPostCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setPost({ title: "", content: ""});
    setIsCreatingPost(false);
    setIsEditingExistingPost(false);
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

  function handlePostEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPost(posts[currentPostId])
    setIsEditingExistingPost(true);
    setIsCreatingPost(true);
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
            <Col md={4} className="overflow-auto p-3">
              <Container className="bordered-container p-3">
                <Posts
                  posts={posts}
                  handlePostClick={handlePostClick}
                  handleNewPostClick={handleNewPostClick}
                />
              </Container>
            </Col>
            <Col md={8} className="p-3">
              <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyAbLxu9qEbBpX8BW3cTMA8M6idiVIOtZhE"
              >
                {!fetchState.isLoading && (isCreatingPost || posts.length === 0) &&
                  <Container className="bordered-container p-3">
                    <PostEdit
                      post={post}
                      isEditingExistingPost={isEditingExistingPost}
                      handleChange={handleNewPostChange}
                      handleNewPostSubmit={handlePostSubmit}
                      handleNewPostCancel={handleNewPostCancel}
                    />
                  </Container>
                }
                {!fetchState.isLoading && !isCreatingPost && posts.length > 0 &&
                  <Container className="bordered-container p-3">
                    <PostView
                      post={posts[currentPostId]}
                      handlePostEdit={handlePostEdit}
                      handlePostDelete={handlePostDelete}
                    />
                  </Container>
                }
              </LoadScript>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
