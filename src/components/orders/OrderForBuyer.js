import React from 'react';
import axios from 'axios';
import { confirmAlert, notifyError, notifySuccess, inputScoreForSellerProduct } from '../../util/Alerts'
import toCustomDate from '../../util/Date';
const Order = ({ order }) => {

  const handleClickFinish = (orderId, productId, sellerId) => {
    confirmAlert('Esta acción no se podrá revertir', 'Sí, marcar como recibido')
      .then(res => {
        if (res) {
          axios.get(`/order/${orderId}/buyer`)
            .then(() => {
              inputScoreForSellerProduct().then(res => {
                const scoreProduct = parseInt(res.scoreProduct);
                const scoreSeller = parseInt(res.scoreSeller);
                const productReview = { score: scoreProduct }
                const userReview = { score: scoreSeller }
                axios.post(`/product/${productId}/review`, productReview)
                  .then(() => {
                    axios.post(`/user/${sellerId}/review`, userReview)
                      .then(() => {
                        notifySuccess('Pedido terminado');
                      })
                      .catch(err => {
                        console.log(err.response.data);
                        notifyError('Algo salió mal');
                      })
                  })
                  .catch(err => {
                    console.log(err.response.data)
                    notifyError('Algo salió mal');
                  });
              })
            })
            .catch(() => {
              notifyError('Algo salió mal');
            })
        }
      })
  }
  const date = toCustomDate(order.createdAt);
  return (
    <div className="order-card">
      <p><small>#{order.orderId}</small></p>
      <p className="lead">{order.quantity} {order.productName}</p>
      <p>{order.instructions}</p>
      <small>{date}</small>
      <p><strong>Total</strong>: ${order.total}</p>
      <div className="text-center">
        <button onClick={() => handleClickFinish(order.orderId, order.productId, order.sellerId)} type="button" className="btn btn-success">Marcar como recibido</button>
      </div>
    </div>
  );
}

export default Order;