import React, { useState } from 'react';
import { Post } from '../types/PostType';
import { Form, Button } from 'react-bootstrap';

type PostEditProps = {
  post: Post,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isEditingExistingPost: boolean,
  handleNewPostSubmit: Function,
  handleNewPostCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PostEdit = 
    ({ post, handleChange, isEditingExistingPost,
       handleNewPostSubmit, handleNewPostCancel }: PostEditProps) => {

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleNewPostSubmit();
    }
    setValidated(true);
  }

  return (<>
      {isEditingExistingPost && <h2>Editing Post</h2>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={post.title}
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Enter title"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            value={post.content}
            name="content"
            onChange={handleChange}
            as="textarea"
            placeholder="Enter content"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Latitude (optional)</Form.Label>
          <Form.Control
            value={post.lat ? post.lat.toString() : ''}
            name="lat"
            onChange={handleChange}
            type="number"
            step="any"
            placeholder="Enter latitude"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Longitude (optional)</Form.Label>
          <Form.Control
            value={post.long ? post.long.toString() : ''}
            name="long"
            onChange={handleChange}
            type="number"
            step="any"
            placeholder="Enter longitude"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL (optional)</Form.Label>
          <Form.Control
            value={post.image_url}
            name="image_url"
            onChange={handleChange}
            type="text"
            placeholder="Enter image URL"
          />
        </Form.Group>
        <Button className="mx-1" variant="primary" type="submit">
          Submit
        </Button>
        <Button className="mx-1" variant="outline-secondary" onClick={handleNewPostCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
  
}
  

export default PostEdit;
