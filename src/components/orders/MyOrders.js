import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { confirmAlert, notifySuccess, notifyError } from '../../util/Alerts'


const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/my-orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleClickFinish = orderId => {
    confirmAlert('Esta acción no se podrá revertir', 'Sí, marcar como recibido')
      .then(res => {
        if (res) {
          axios.get(`/order/${orderId}/buyer`)
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
              <p className="lead text-gray">{order.quantity} {order.productName}</p>
              <p className="text-gray">{order.instructions}</p>
              <small className="text-gray">{order.createdAt}</small>
              <p className="text-gray"><strong>Total</strong>: ${order.total}</p>
            </div>
          ) : (
              <div>
                <p><small>#{order.orderId}</small></p>
                <p className="lead">{order.quantity} {order.productName}</p>
                <p>{order.instructions}</p>
                <small>{order.createdAt}</small>
                <p><strong>Total</strong>: ${order.total}</p>
                <div className="text-center">
                  <button onClick={() => handleClickFinish(order.orderId)} type="button" className="btn btn-success">Marcar como recibido</button>
                </div>
              </div>
            )}
        </div>
      </div>
    ))
  ) : (
      <p>Cargando...</p>
    )

  return (
    <div className="container">
      {ordersMarkup}
    </div>
  );
}

export default MyOrders;