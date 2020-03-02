import React from 'react';
import { Post } from '../types/PostType';
import GoogleMapView from './GoogleMapView';
import { Image, Button, ButtonToolbar, Row, Col } from 'react-bootstrap';

type PostViewProps = {
  post: Post,
  handlePostEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handlePostDelete: (id: number | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PostView = ({ post, handlePostEdit, handlePostDelete }: PostViewProps) => (
  <>
    <ButtonToolbar>
      <Button
        variant="outline-primary"
        onClick={(e: any) => handlePostEdit(e)}
      >
        Edit
      </Button>
      <Button
        className="mx-1"
        variant="danger"
        onClick={(e: any) => handlePostDelete(post.id, e)}
        type="submit"
      >
        Delete
      </Button>
    </ButtonToolbar>
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
    <Row>
      <Col md="7">
        {post.lat && post.long && 
          <GoogleMapView identifier={post.id} lat={post.lat} long={post.long} />
        }
      </Col>
      <Col md="5">
        {post.image_url && <Image src={post.image_url} fluid />}
      </Col>
    </Row>
    <Row>
      
    </Row>
  </>
);

export default PostView;
