import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
// import logo from './logo.svg';
import './App.css';

interface Post {
  id: number,
  title: string,
  content: string,
  lat: number,
  long: number,
  image_url: string,
  created_at: Date,
  updated_at: Date,
}

const Posts = () => {
  const [hasErrors, setErrors] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchData() {
    const res = await fetch("https://wf-challenge-d6haqugtoo.herokuapp.com/api/v1/posts");
    res.json()
      .then(res => setPosts(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  const post_list = posts.map((item, key) =>
    <li>{item.title}</li>
  );

  return (
    <div className="container">
      {post_list}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ol>
          <Posts/>
        </ol>
      </header>
    </div>
  );
}

export default App;
