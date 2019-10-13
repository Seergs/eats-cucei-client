import axios from 'axios';

export const uploadImage = (formData) => (dispatch) => {
  axios.post(`/product/image`, formData)
    .then(() => {
      return
    })
    .catch(err => console.log(err));
}
