import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import axios from 'axios';

toast.configure({
  autoClose: 8000,
  draggable: false,
})

const ProductDetailsBuyer = (props) => {
  const product = props.product;
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
        notifySuccess();
        props.history.push('/');
      })
      .catch(err => notifyError(err))
  }

  const notifySuccess = () => {
    toast.success("Pedido realizado, espera la confirmación del vendedor", {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    })
  };

  const notifyError = (message) => {
    toast.error(message, {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }
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
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ProductDetailsBuyer);