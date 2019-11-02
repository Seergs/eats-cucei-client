import React from 'react';
import axios from 'axios';
import { notifyError, notifySuccess, confirmAlert, inputScoreForBuyer } from '../../util/Alerts'
import { Link } from 'react-router-dom';
const OrderForSeller = ({ order }) => {

  const handleClickFinish = orderId => {
    confirmAlert('Esta acción no se podrá revertir', 'Sí, marcar como entregado')
      .then(res => {
        if (res) {
          axios.get(`/order/${orderId}/seller`)
            .then(() => {
              inputScoreForBuyer().then(res => {
                const scoreUser = parseInt(res);
                const userReview = { score: scoreUser }
                axios.post(`/user/${order.buyerId}/review`, userReview)
                  .then(res => {
                    notifySuccess('Pedido terminado');
                  })
                  .catch(err => {
                    console.log(err.response.data);
                    notifyError('Algo salió mal');
                  })
              })
            })
            .catch(() => {
              notifyError('Algo salió mal');
            })
        }
      })
  }
  return (
    <div className="order-card">
      <p><small>#{order.orderId}</small></p>
      <p className="lead">
        {order.buyerName} quiere {order.quantity} {order.productName}
      </p>
      <p>{order.instructions}</p>
      <p><strong>Total</strong>: ${order.total}</p>
      <div className="text-center">
        <Link to={`/profile/${order.buyerId}`}> <button type="button" className="btn btn-outline-info">Ver perfil de {order.buyerName}</button></Link>
        <br />
        <button onClick={() => handleClickFinish(order.orderId)} type="button" className="btn btn-success">Marcar como entregado</button>
      </div>
    </div>
  );
}

export default OrderForSeller;