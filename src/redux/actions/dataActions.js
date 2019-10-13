import axios from 'axios';
import { LOADING_UI, CLEAR_ERRORS, SET_ERRORS } from '../types'

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  return new Promise((resolve, reject) => {
    axios.post(`/product/image`, formData)
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

export const postProduct = newProduct => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/product', newProduct)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      console.log('successfully');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
}
