import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { uploadImage, postProduct } from '../../redux/actions/dataActions';
import { Redirect } from 'react-router-dom';

const PostProduct = (props) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImgUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const { ui: { loading } } = props;

  useEffect(() => {
    if (props.ui.errors) {
      setErrors(props.ui.errors);
    }
  }, [props.ui.errors])

  const handleChangeName = e => setName(e.target.value);
  const handleChangePrice = e => setPrice(e.target.value);
  const handleChangeDescription = e => setDescription(e.target.value);
  const handleEditPicture = e => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  const handleChangeImage = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    props.uploadImage(formData)
      .then(imageUrl => {
        setImgUrl(imageUrl);
      })
      .catch(err => {
        console.log(err)
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price,
      imageUrl
    }
    props.postProduct(newProduct);
  }
  if (props.user.credentials.accountType === null) console.log('null');
  if (props.user.authenticated === false) return <Redirect to='/login' />
  else if (props.user.credentials.enabled === false) return <Redirect to='/login' />
  else if (props.user.credentials.accountType === 'buyers') return <Redirect to='/' />
  else {
    return (
      <div className="container">
        <br />
        <br />
        <form className="createFood" onSubmit={(e) => handleSubmit(e)}>
          <h4 className="text-center">Agrega un producto para su venta.</h4>
          <br />
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" className="form-control" id="name" placeholder="Nombre" value={name} onChange={(e) => handleChangeName(e)} required />
            {errors.name && (
              <small id="nameHelp-product" className="form-text text-muted text-center">{errors.name}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" name="price" className="form-control" id="price" placeholder="Precio" value={price} onChange={(e) => handleChangePrice(e)} required />
          </div>
          {errors.price && (
            <small id="priceHelp" className="form-text text-muted text-center">{errors.price}</small>
          )}
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea className="form-control" name="description" type="text" id="description" placeholder="Descripción" value={description} onChange={(e) => handleChangeDescription(e)} required></textarea>
          </div>
          {errors.description && (
            <small id="descriptionHelp" className="form-text text-muted text-center">{errors.description}</small>
          )}
          <input type="file" id="imageInput" onChange={e => handleChangeImage(e)} hidden required />
          <button className="btn btn-secondary" onClick={e => handleEditPicture(e)}>Elegir imagen</button>
          {errors.image && (
            <small id="imageHelp" className="form-text text-muted">{errors.image}</small>
          )}
          <br />
          <br />
          <button className="btn btn-success" type="submit" id='post-product' disabled={loading}>Poner a la venta</button>
        </form>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.user
})

const mapActionsToProps = {
  uploadImage,
  postProduct
}

export default connect(mapStateToProps, mapActionsToProps)(PostProduct);