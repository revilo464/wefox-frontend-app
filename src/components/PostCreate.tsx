import React from 'react';
import { Post } from './Posts';

type PostEditProps = {
  post: Post,
}

const PostEdit = ({ post }: PostEditProps) => (
  <>  
    <header>
      {post.title}
    </header>
    <ol>
      <li>test</li>
    </ol>
  </>
);

export default PostEdit;
