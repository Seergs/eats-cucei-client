import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const ProductDetailsSeller = (props) => {
  const product = props.product;
  const productId = product.productId;
  const history = props.history;

  const handleClickDisable = e => {
    axios.get(`/product/${productId}/disable`)
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
  const handleClickEnable = e => {
    axios.get(`/product/${productId}/enable`)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleClickDelete = e => {
    axios.delete(`/product/${productId}`)
      .then(res => {
        console.log('product deleted');
      })
      .catch(err => console.log(err));
    history.push('/');
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
              <button type="button" data-toggle="modal" data-target="#disableConfirm" className="btn btn-secondary">Desactivar producto</button>
            </div>
            :
            <div>
              <p>Este producto está desactivado</p>
              <div className="text-center">
                <button type="button" data-toggle="modal" data-target="#enableConfirm" className="btn btn-primary">Activar</button>
              </div>
            </div>
          }
          <br />
          <div className="delete-update-btns text-center">
            <Link to={`/product/${productId}/update`}>
              <button className="btn btn-success">Modificar</button>
            </Link>
            <button className="btn btn-danger" type="button" data-toggle="modal" data-target="#deleteConfirm">Eliminar</button>
          </div>

          <div className="modal fade" id="deleteConfirm" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalTitle">Estás seguro que quieres eliminar este producto?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Esta acción será irreversible y eliminará permanentemente tu producto.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={e => handleClickDelete(e)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="disableConfirm" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="disableModalTitle">Desactivar producto?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Los compradores no podrán ver este producto.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-secondary" onClick={e => handleClickDisable(e)}>Desactivar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="enableConfirm" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="enableModalTitle">Activar producto?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Los compradores ahora podrán ver este producto.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-primary" onClick={e => handleClickEnable(e)}>Activar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSeller;