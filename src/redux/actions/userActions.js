import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
}

export const signupUser = (newUser, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUser)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const getUserData = () => (dispatch) => {
  axios.get('/user')
    .then(res => {
      if (res.data.credentials.enabled === false) {
        dispatch({
          type: SET_ERRORS,
          payload: { error: 'account disabled' },
        })
        dispatch(logOutUser())
      } else {
        dispatch({
          type: SET_USER,
          payload: res.data
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
}

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}


export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  return new Promise((resolve, reject) => {
    axios.post(`/user/image`, formData)
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        resolve(res.data.imageUrl);
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
        dispatch({ type: LOADING_UI })
        reject('algo salió mal');
      });
  })
}