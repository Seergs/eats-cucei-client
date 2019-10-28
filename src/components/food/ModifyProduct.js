import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { uploadImage, updateProduct } from '../../redux/actions/dataActions';
import { notifyError, notifySuccess, confirmAlert } from '../../util/Alerts'

const ModifyProduct = (props) => {
  const productId = props.match.params.productId;
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(res => {
        setProduct(res.data);
        setDescription(res.data.description);
        setName(res.data.name);
        setPrice(res.data.price);
        setImageUrl(res.data.imageUrl);
        setTags(res.data.tags);
      })
      .catch(err => console.log(err));
  }, [productId]);

  useEffect(() => {
    axios.get('/tags')
      .then(res => {
        setDbTags(res.data);
      })
      .catch(err => console.log(err));
  }, [])

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

  const handleSubmit = async e => {
    e.preventDefault();
    confirmAlert('Los cambios se aplicarán inmediatamente', 'Sí, modificar')
      .then(result => {
        if (result) {
          const productId = props.match.params.productId;
          const product = {
            productId,
            description,
            name,
            price,
            imageUrl,
            tags
          }
          props.updateProduct(product)
            .then(() => {
              notifySuccess('Producto actualizado')
              props.history.push('/');
            })
            .catch(err => {
              console.log(err)
              notifyError('Algo salió mal');
            });
        }
      })
  }
  const handleTagChange = e => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    }
  }
  const handleTagClick = e => {
    e.persist();
    const tagName = e.target.getAttribute('name')
    setTags(tags.filter(tag => tag !== tagName));
  }
  let displayDBTags = dbTags && dbTags.map(tag => (
    <option value={tag} key={tag}>{tag}</option>
  ))
  let displayProductTags = tags && tags.map(tag => (
    <span name={tag} className="badge badge-pill badge-primary clickable-badge" key={tag} onClick={e => handleTagClick(e)}>{tag}</span>
  ))
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
          <label>Categorías: </label>{displayProductTags}
          <br />
          <select onChange={e => handleTagChange(e)}>
            <option value="">Selecciona una categoría</option>
            {displayDBTags}
          </select>
          <br /><br />
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