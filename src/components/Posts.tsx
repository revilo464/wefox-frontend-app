import React from 'react';
import { ListGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { Post } from '../types/PostType';

type PostsProps = {
  handlePostClick: (postId: number | undefined) => void,
  handleNewPostClick: () => void,
  posts: Post[],
}

const Posts = ({ posts, handlePostClick, handleNewPostClick }: PostsProps) => {
  
  const post_list = posts.map((item, key) =>
    <ListGroup.Item action key={item.id} onClick={() => handlePostClick(key)}>{item.title}</ListGroup.Item>
  );

  return (
    <>
      <ButtonToolbar className="mb-3">
        <Button variant="outline-primary" onClick={() => handleNewPostClick()}>+ Add a Post</Button>
      </ButtonToolbar>
      <ListGroup>
        {post_list}
      </ListGroup>
    </>
  );
}

export default Posts;
