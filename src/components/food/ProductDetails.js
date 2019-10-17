import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const ProductDetails = (props) => {
  const productId = props.match.params.productId;
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const user = props.user;
  const userId = user.credentials.userId;

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.log(err));
  }, [productId])

  const handleChangeInstructions = e => { setInstructions(e.target.value) };
  const handleDecrement = e => { if (quantity > 1) setQuantity(quantity - 1) }
  const handleIncrement = e => { setQuantity(quantity + 1) }
  const handleSubmit = e => { e.preventDefault() }
  const handleOrderClose = e => { props.history.push('/') };
  const handleClickDelete = e => {
    axios.delete(`/product/${productId}`)
      .then(res => {
        console.log('product deleted');
      })
      .catch(err => console.log(err));
    props.history.push('/');
  }

  if (user) {
    if (user.authenticated) {
      if (product) {
        if (user.credentials.accountType === 'sellers') {//user is seller
          if (userId === product.sellerId) { // user is product seller
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
                        <button className="btn btn-secondary">Desactivar producto</button>
                      </div>
                      :
                      <div>
                        <p>Este producto está desactivado</p>
                        <button>Activar</button>
                      </div>
                    }
                    <br />
                    <div className="delete-update-btns text-center">
                      <button className="btn btn-success">Modificar</button>
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
                  </div>
                </div>
              </div>
            )
          } else return <Redirect to='/' />
        } else {
          return (
            <div className="container food-details">
              <div className="card card-details">
                <div className="card-body">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <textarea value={instructions} onChange={e => handleChangeInstructions(e)} type="text" rows="5" placeholder="Instrucciones especiales"></textarea>
                  <div className="increment">
                    <button onClick={e => handleDecrement(e)}>-</button>
                    <label>{quantity}</label>
                    <button onClick={e => handleIncrement(e)}>+</button>
                  </div>
                  <button type="button" data-toggle="modal" data-target="#orderCompleted" onClick={e => handleSubmit(e)} className="order-btn">Ordenar</button>
                </div>
              </div>
              <div className="modal fade" id="orderCompleted" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Listo!</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">Tu orden ha sido enviada</div>
                    <div className="modal-footer">
                      <button onClick={e => handleOrderClose(e)} type="button" className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      } else {
        return <p>Cargando...</p>
      }
    } else {
      return <Redirect to='/login' />
    }
  } else {
    return <p>Cargando...</p>
  }

}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ProductDetails);