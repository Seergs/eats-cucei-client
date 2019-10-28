import React, { useState } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { notifyError, notifySuccess } from '../../util/Alerts';

const ProductDetailsBuyer = (props) => {
  const product = props.product;
  const history = props.history;
  const userId = props.user.credentials.userId;
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleChangeInstructions = e => { setInstructions(e.target.value) };
  const handleDecrement = () => { if (quantity > 1) setQuantity(quantity - 1) }
  const handleIncrement = () => { setQuantity(quantity + 1) }
  const handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      productId: product.productId,
      buyerId: userId,
      productPrice: product.price,
      instructions,
      quantity,
    }
    axios.post('/order', newOrder)
      .then(() => {
        notifySuccess('Pedido realizado, espera la confirmación del vendedor');
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        notifyError('Algo salió mal, intenta de nuevo más tarde');
      })
  }

  return (
    <div className="container food-details">
      <br /><br />
      <div className="card card-details card-details-buyer">
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
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ProductDetailsBuyer);