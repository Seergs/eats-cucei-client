import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert, notifyError, notifySuccess } from '../../util/Alerts'
import { Link } from 'react-router-dom';

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

  const handleClickFinish = orderId => {
    confirmAlert('Esta acción no se podrá revertir', 'Sí, marcar como entregado')
      .then(res => {
        if (res) {
          axios.get(`/order/${orderId}/seller`)
            .then(() => {
              notifySuccess('Pedido terminado');
            })
            .catch(() => {
              notifyError('Algo salió mal');
            })
        }
      })
  }

  let ordersMarkup = orders ? (
    orders.map(order => (
      <div className="card order-card" key={order.orderId}>
        <div className="card-body">
          {order.finished ? (
            <div>
              <p className="text-green">Completado</p>
              <p className="text-gray"><small>#{order.orderId}</small></p>
              <p className="lead text-gray">
                {order.buyerName} quiere {order.quantity} {order.productName}
              </p>
              <p className="text-gray">{order.instructions}</p>
              <p className="text-gray"><strong>Total</strong>: ${order.total}</p>
            </div>
          ) :
            <div>
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
          }
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