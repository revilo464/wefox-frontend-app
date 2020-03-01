import React from 'react';
import { Post } from '../types/PostType';
import GoogleMapView from './GoogleMapView';

type PostViewProps = {
  post: Post,
}

const PostView = ({ post }: PostViewProps) => (
  <>  
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
    
  </>
);

export default PostView;
