import axios from 'axios';

import { POSTS_URL } from '../Constants';
import { FetchActions } from './FetchReducer';
import { Post, PostJSON, decodePost, encodePost } from '../types/PostType';

const baseAPI = axios.create({
  baseURL: POSTS_URL,
  responseType: "json"
});

export const listPosts = 
    async (dispatch: React.Dispatch<FetchActions>
          ,setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  dispatch({type: 'FETCH_INIT'});
  await baseAPI.get<PostJSON[]>("")
    .then((response) => {
      setPosts(response.data.map(decodePost));
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({type: 'FETCH_FAILURE'});
    });
};

export const createPost = 
    async (dispatch: React.Dispatch<FetchActions>
          ,post: Post) => {
  dispatch({type: 'FETCH_INIT'});
  await baseAPI.post<Post>("", encodePost(post))
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data
        });
      } else {
        dispatch({
          type: 'FETCH_FAILURE'
        });
      }
    })
    .catch((error) => {
      dispatch({type: 'FETCH_FAILURE'});
    });
};
