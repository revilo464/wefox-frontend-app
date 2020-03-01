import React from 'react';
import { Post } from '../types/PostType';
import { Form } from 'react-bootstrap';

type PostEditProps = {
  post: Post,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PostEdit = ({ post, handleChange }: PostEditProps) => (
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
  </Form>
);

export default PostEdit;
