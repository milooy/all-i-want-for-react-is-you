import { handleActions } from 'redux-actions';

import axios from 'axios';

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_FULFILLED = 'GET_POST_FULFILLED';
const GET_POST_REJECTED = 'GET_POST_REJECTED';

export const getPost = postId => ({
  type: GET_POST,
  payload: getPostAPI(postId),
});

/*
// Without redux-promise-middleware
export const getPost = (postId) => async dispatch => {
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch({type: GET_POST_PENDING});

    // 요청을 시작합니다
    try {
      const response = await getPostAPI(postId);
      return dispatch({
        type: GET_POST_SUCCESS,
        payload: response
      })
    } catch(e) {
      return dispatch({
        type: GET_POST_FAILURE,
        payload: e
      });
    }
}
*/

const initialState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: '',
  },
};

export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_POST_FULFILLED]: (state, action) => {
      const { title, body } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          body,
        },
      };
    },
    [GET_POST_REJECTED]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState,
);
