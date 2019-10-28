import axios from 'axios';
import { LOADING_UI, LOADING_DATA, CLEAR_ERRORS, SET_ERRORS, SET_PRODUCTS, REVIEW_PRODUCT, DELETE_PRODUCT } from '../types'

export const getProducts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get('/products')
    .then(res => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_PRODUCTS,
        payload: []
      })
    })
}

export const getMyProducts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get('/my-products')
    .then(res => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_PRODUCTS,
        payload: []
      })
    })
}

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
  return new Promise((resolve, reject) => {
    axios.post('/product', newProduct)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        resolve();
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
        reject();
      });
  })

}

export const updateProduct = product => (dispatch) => {
  dispatch({ type: LOADING_UI });
  return new Promise((resolve, reject) => {
    axios.post(`/product/${product.productId}/update`, product)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        resolve();
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
        reject();
      })
  })

}

export const reviewProduct = productId => dispatch => {
  axios.post(`/product/${productId}/review`)
    .then(res => {
      dispatch({
        type: REVIEW_PRODUCT,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

export const deleteProduct = productId => dispatch => {
  return new Promise((resolve, reject) => {
    axios.delete(`/product/${productId}`)
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: productId
        })
        resolve();
      })
      .catch(err => {
        console.log(err)
        reject();
      })
  })
}