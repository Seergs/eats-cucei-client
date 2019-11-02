import React from 'react';
import toCustomDate from '../../util/Date'
const FinishedOrderBuyer = ({ order }) => {
  const date = toCustomDate(order.createdAt);
  return (
    <div className="order-card">
      <p className="text-green">Ya recibiste este pedido</p>
      <p className="text-gray"><small>#{order.orderId}</small></p>
      <p className="lead text-gray">{order.quantity} {order.productName}</p>
      <p className="text-gray">{order.instructions}</p>
      <small className="text-gray">{date}</small>
      <p className="text-gray"><strong>Total</strong>: ${order.total}</p>
    </div>
  );
}

export default FinishedOrderBuyer;