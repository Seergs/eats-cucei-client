import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';

const EditProfile = (props) => {
  const user = props.location.state.user
  const [imageUrl, setImgUrl] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setImgUrl(user.imageUrl);
    setName(user.name);
    setPhoneNumber(user.phoneNumber);
  }, [user])

  const handleChangeName = e => setName(e.target.value);
  const handleChangePhone = e => setPhoneNumber(e.target.value);

  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    props.uploadImage(formData)
      .then(imageUrl => {
        console.log(imageUrl);
        setImgUrl(imageUrl);
      })
      .catch(err => {
        console.log(err)
      });
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  return (
    <div className="container edit-profile">
      <br />
      <h3>Modifica tu perfil</h3>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input className="form-control" type="text" placeholder="Nombre" name="name" value={name} onChange={e => handleChangeName(e)} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input className="form-control" type="tel" placeholder="Teléfono" name="phone" value={phoneNumber} onChange={e => handleChangePhone(e)} />
      </div>
      <input type="file" id="imageInput" onChange={e => handleChangeImage(e)} hidden required />
      <button className="btn btn-secondary" onClick={e => handleEditPicture(e)}>Elegir imagen</button>
      <br /><br />
      {imageUrl && (
        <div className="text-center">
          <img src={imageUrl} alt="product" />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  uploadImage
}

export default connect(null, mapDispatchToProps)(EditProfile);