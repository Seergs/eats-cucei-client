import { SET_PRODUCTS, REVIEW_PRODUCT, LOADING_DATA, DELETE_PRODUCT } from '../types';

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default function (state = initialState, action) {
  var index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    case REVIEW_PRODUCT:
      index = state.products.findIndex((product) => product.productId === action.payload.productId);
      state.products[index] = action.payload;
      return {
        ...state
      }
    case DELETE_PRODUCT:
      index = state.products.findIndex(product => product.productId === action.payload);
      state.products.splice(index, 1);
      return {
        ...state
      }
    default:
      return state;
  }
}