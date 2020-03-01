import axios from 'axios';

import { POSTS_URL } from '../Constants';
import { Post, PostJSON, decodePost, encodePost } from '../types/PostType';

type PostAPIProps = {
  getPosts: () => Post[],
  setPosts: (posts: Post[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setErrors: (errors: boolean) => void,
}

const PostAPI = ({ getPosts, setPosts, setIsLoading, setErrors }: PostAPIProps) => {
  
  const fetchData = async () => {
    setIsLoading(true);
    await axios.get<PostJSON[]>(POSTS_URL)
      .then((response) => {
        setPosts(response.data.map(decodePost));
        setIsLoading(false);
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  const postData = async (post: Post) => {
    setIsLoading(true);
    await axios.post(POSTS_URL, encodePost(post))
      .then((response) => {
        fetchData();
        setIsLoading(false);
      })
      .catch((error) => {
        setErrors(error);
      });
  };
  
  return { fetchData, postData }
}

export default PostAPI;
