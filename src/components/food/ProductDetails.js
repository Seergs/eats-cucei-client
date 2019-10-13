import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ProductDetails = (props) => {
  const productId = props.match.params.productId;
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [productId])

  const handleChangeInstructions = e => { setInstructions(e.target.value) };
  const handleDecrement = e => { if (quantity > 1) setQuantity(quantity - 1) }
  const handleIncrement = e => { setQuantity(quantity + 1) }
  const handleSubmit = e => { e.preventDefault() }
  const handleOrderClose = e => { props.history.push('/') };

  if (product) {
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
  } else {
    return <p>Cargando..</p>
  }
}

export default ProductDetails;