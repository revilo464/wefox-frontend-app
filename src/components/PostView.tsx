import React from 'react';
import { Post } from '../types/PostType';
import GoogleMapView from './GoogleMapView';
import { Container, Button } from 'react-bootstrap';

type PostViewProps = {
  post: Post,
  handlePostDelete: (id: number | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PostView = ({ post, handlePostDelete }: PostViewProps) => (
  <Container className="p-3">
    <h1>
      <b>Title:</b> {post.title}
    </h1>
    <p>
      <b>Content: </b> {post.content}  
    </p>
    {post.lat &&
      <p>
        <b>Latitude: </b> {post.lat}
      </p>
    }
    {post.long &&
      <p>
        <b>Longitude: </b> {post.long}
      </p>
    }
    {post.lat && post.long && 
      <GoogleMapView identifier={post.id} lat={post.lat} long={post.long} />
    }
    <Button
      className="mx-1"
      variant="danger"
      onClick={(e: any) => handlePostDelete(post.id, e)}
      type="submit"
    >
      Delete
    </Button>
  </Container>
);

export default PostView;
