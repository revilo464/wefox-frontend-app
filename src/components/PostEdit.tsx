import React from 'react';
import { Post } from '../types/PostType';
import { Form, Button } from 'react-bootstrap';

type PostEditProps = {
  post: Post,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleNewPostSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleNewPostCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PostEdit = ({ post, handleChange, handleNewPostSubmit, handleNewPostCancel }: PostEditProps) => (
  <Form>
    <Form.Group>
      <Form.Label>Title</Form.Label>
      <Form.Control
        value={post.title}
        name="title"
        onChange={handleChange}
        type="text"
        placeholder="Enter title"
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
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Latitude (optional)</Form.Label>
      <Form.Control
        value={post.lat ? post.lat.toString() : ''}
        name="lat"
        onChange={handleChange}
        type="number"
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
    <Button className="mx-1" variant="primary" onClick={handleNewPostSubmit} type="submit">
      Submit
    </Button>
    <Button className="mx-1" variant="outline-secondary" onClick={handleNewPostCancel}>
      Cancel
    </Button>
  </Form>
);

export default PostEdit;
