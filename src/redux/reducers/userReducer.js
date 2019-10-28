import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, REVIEW_PRODUCT } from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  notifications: [],
  orders: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    case REVIEW_PRODUCT:
      return {
        ...state,
        reviews: [
          ...state.reviews,
          {
            userId: state.credentials.userId,
            productId: action.payload.productId
          }
        ]
      }
    default: return state
  }
}