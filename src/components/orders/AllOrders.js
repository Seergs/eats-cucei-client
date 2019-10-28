import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders')
      .then(res => {
        setOrders(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  let ordersMarkup = orders ? (
    orders.map(order => (
      <div className="card order-card" key={order.orderId}>
        <div className="card-body">
          <p><small>#{order.orderId}</small></p>
          <p className="lead">
            {order.buyerName} quiere {order.quantity} {order.productName}
          </p>
          <p>{order.instructions}</p>
          <p><strong>Total</strong>: ${order.total}</p>
          <div className="text-center">
            <button type="button" className="btn btn-outline-info">Ver perfil de {order.buyerName}</button>
            <br />
            <button type="button" className="btn btn-success">Marcar como completado</button>
          </div>
        </div>
      </div>
    ))
  ) : (
      <p>Cargando...</p>
    )

  return (
    <div>
      <br />
      <h4 className="text-center">Todos tus pedidos</h4>
      {ordersMarkup}
    </div>
  );
}

export default AllOrders;