import React from 'react';
import { ListGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { Post } from '../types/PostType';

type PostsProps = {
  handlePostClick: (postId: number | undefined) => void,
  posts: Post[],
}

const Posts = ({ posts, handlePostClick }: PostsProps) => {
  
  const post_list = posts.map((item, key) =>
    <ListGroup.Item action key={item.id} onClick={() => handlePostClick(key)}>{item.title}</ListGroup.Item>
  );

  // const post_list = () => {
  //   let post_test: JSX.Element[] = [];
  //   for (let i = 0; i < 250; i++) {
  //     let new_post = { id: i, title: i.toString(), content: "blah" };
  //     post_test.push(<ListGroup.Item action onClick={() => handlePostClick(new_post.id)}>{new_post.title}</ListGroup.Item>);
  //   }
  //   return post_test;
  // }

  return (
    <>
      <ButtonToolbar className="my-2">
        <Button variant="outline-primary">+ Add a Post</Button>
      </ButtonToolbar>
      
      {post_list}
    </>
  );
}

export default Posts;
