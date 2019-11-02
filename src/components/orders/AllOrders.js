import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FinishedOrder from './FinishedOrder';
import FinishedOrderSeller from './FinishedOrderSeller';
import OrderForSeller from './OrderForSeller';

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
    orders.map(order => {
      if (order.finished) {
        return (
          <FinishedOrder key={order.orderId} order={order} />
        )
      } else if (order.finishedBySeller) {
        return (
          <FinishedOrderSeller key={order.orderId} order={order} />
        )
      } else {
        return (
          <OrderForSeller key={order.orderId} order={order} />
        )
      }
    }
    )
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