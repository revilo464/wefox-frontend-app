import React from 'react';
import { Post } from './Posts';

type PostViewProps = {
  post: Post,
}

const PostView = ({ post }: PostViewProps) => (
  <>  
    <header>
      {post.title}
    </header>
    <ol>
      <li>test</li>
    </ol>
  </>
);

export default PostView;
