import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/dataActions';

const PostProduct = (props) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    props.uploadImage(formData);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="container">
      <br />
      <br />
      <form className="createFood" onSubmit={(e) => handleSubmit(e)}>
        <h4 className="text-center">Agrega un producto para su venta.</h4>
        <br />
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" className="form-control" id="name" placeholder="Nombre" value={name} onChange={(e) => handleChangeName(e)} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input type="number" className="form-control" id="price" placeholder="Precio" value={price} onChange={(e) => handleChangePrice(e)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea className="form-control" type="text" id="description" placeholder="Descripción" value={description} onChange={(e) => handleChangeDescription(e)}></textarea>
        </div>
        <input type="file" id="imageInput" onChange={e => handleChangeImage(e)} hidden />
        <button className="btn btn-secondary" onClick={e => handleEditPicture(e)}>Elegir imagen</button>
        <br />
        <br />
        <button className="btn btn-success" type="submit">Poner a la venta</button>
      </form>
    </div >
  );
}

const mapActionsToProps = { uploadImage }

export default connect(null, mapActionsToProps)(PostProduct);