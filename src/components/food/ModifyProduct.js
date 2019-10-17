import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { uploadImage, updateProduct } from '../../redux/actions/dataActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 8000,
  draggable: false,
})

const ModifyProduct = (props) => {
  const productId = props.match.params.productId;
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const notifySuccess = () => {
    toast.success("Producto modificado", {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    })
  };
  const notifyError = () => {
    toast.error("Algo salió mal", {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(res => {
        setProduct(res.data);
        setDescription(res.data.description);
        setName(res.data.name);
        setPrice(res.data.price);
        setImageUrl(res.data.imageUrl);
      })
      .catch(err => console.log(err));
  }, [productId]);

  const handleChangeDescription = e => { setDescription(e.target.value) };
  const handleChangeName = e => { setName(e.target.value) };
  const handleChangePrice = e => { setPrice(e.target.value) };
  const handleChangeImage = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    props.uploadImage(formData)
      .then(imageUrl => {
        setImageUrl(imageUrl);
      })
      .catch(err => {
        console.log(err)
      });
  }
  const handleEditPicture = e => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  const handleSubmit = e => {
    e.preventDefault();
    const productId = props.match.params.productId;
    const product = {
      productId,
      description,
      name,
      price,
      imageUrl
    }
    props.updateProduct(product)
      .then(() => {
        notifySuccess();
        props.history.push('/');
      })
      .catch(err => {
        console.log(err)
        notifyError();
      });
  }


  if (product) {
    return (
      <div className="container update-product">
        <br />
        <h2>Datos actuales</h2>
        <br />
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" className="form-control" id="name" placeholder="Nombre" value={name} onChange={e => handleChangeName(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input type="text" className="form-control" id="description" placeholder="Descripción" value={description} onChange={e => handleChangeDescription(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="text" className="form-control" id="price" placeholder="Precio" value={price} onChange={e => handleChangePrice(e)} />
          </div>
          <br />
          <img src={imageUrl} alt="product" />
          <br /><br />
          <input type="file" id="imageInput" onChange={e => handleChangeImage(e)} hidden required name="image" />
          <div className="text-center">
            <button className="btn btn-secondary" onClick={e => handleEditPicture(e)}>Elegir imagen</button>
          </div>
          <br />
          <div className="text-center">
            <button onClick={e => handleSubmit(e)} className="btn btn-success" type="submit" id='update-product'>Actualizar</button>
          </div>
        </form>
      </div>
    );
  } else {
    return <p>Cargando...</p>
  }

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  uploadImage, updateProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProduct);