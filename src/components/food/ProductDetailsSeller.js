import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { confirmAlert, notifySuccess, notifyError } from '../../util/Alerts'
import { connect } from 'react-redux'
import { deleteProduct } from '../../redux/actions/dataActions'

const ProductDetailsSeller = (props) => {
  const product = props.product;
  const productId = product.productId;
  const history = props.history;

  const handleClickDisable = () => {
    confirmAlert('Los compradores no podrán ver este producto', 'Sí, desactivar')
      .then(result => {
        if (result) {
          axios.get(`/product/${productId}/disable`)
            .then(() => {
              window.location.reload();
            })
            .catch(err => {
              console.log(err)
              notifyError('Algo salió mal');
            });
        }
      })
  }
  const handleClickEnable = e => {
    confirmAlert('Los compradores ahora podrán ver este producto', 'Sí, activar')
      .then(result => {
        if (result) {
          axios.get(`/product/${productId}/enable`)
            .then(() => {
              window.location.reload();
            })
            .catch(err => {
              console.log(err)
              notifyError('Algo salió mal')
            })
        }
      })
  }
  const handleClickDelete = e => {
    confirmAlert('Cuidado, estas a punto de eliminar este producto', 'Sí, eliminar')
      .then(result => {
        if (result) {
          props.deleteProduct(productId)
            .then(() => {
              notifySuccess('Producto eliminado');
              history.push('/');
            })
            .catch(() => {
              notifyError('Algo salió mal');
            })
        }
      })
  }

  return (
    <div className="container">
      <div className="card-details-seller">
        <div className="card-body">
          <h1>Tu producto</h1>
          <h2>{product.name}</h2>
          <p className="lead">{product.description}</p>
          <img src={product.imageUrl} alt="product" />
          <p>Este producto ha sido calificado {product.numberOfReviews} veces.</p>
          <p>Y tiene un puntaje de {product.score}/5.</p>
          <p>Precio: <span className="product-price">${product.price} MX</span></p>
          {product.enabled ?
            <div className="text-center">
              <button type="button" className="btn btn-secondary" onClick={handleClickDisable}>Desactivar producto</button>
            </div>
            :
            <div>
              <p>Este producto está desactivado</p>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleClickEnable}>Activar</button>
              </div>
            </div>
          }
          <br />
          <div className="delete-update-btns text-center">
            <Link to={`/product/${productId}/update`}>
              <button className="btn btn-success">Modificar</button>
            </Link>
            <button className="btn btn-danger" type="button" onClick={handleClickDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteProduct })(ProductDetailsSeller);