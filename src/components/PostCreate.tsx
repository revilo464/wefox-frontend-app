import React from 'react';
import { Post } from '../types/PostType';

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
