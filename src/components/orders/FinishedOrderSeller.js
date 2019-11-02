import React from 'react';
const FinishedOrderSeller = ({ order }) => {
  return (
    <div className="order-card">
      <p className="text-green">Ya entregaste este pedido</p>
      <p className="text-gray"><small>#{order.orderId}</small></p>
      <p className="lead text-gray">
        {order.buyerName} quiere {order.quantity} {order.productName}
      </p>
      <p className="text-gray">{order.instructions}</p>
      <p className="text-gray"><strong>Total</strong>: ${order.total}</p>
    </div>
  );
}

export default FinishedOrderSeller;