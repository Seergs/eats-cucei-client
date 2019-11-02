import React, { useEffect, useState } from 'react';
import axios from 'axios'
import FinishedOrderBuyer from './FinishedOrderBuyer';
import FinishedOrder from './FinishedOrder';
import OrderForBuyer from './OrderForBuyer';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/my-orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  let ordersMarkup = orders ? (
    orders.map(order => {
      if (order.finished) {
        return (
          <FinishedOrder key={order.orderId} order={order} />
        )
      } else if (order.finishedByBuyer) {
        return (
          <FinishedOrderBuyer key={order.orderId} order={order} />
        )
      } else {
        return (
          <OrderForBuyer key={order.orderId} order={order} />
        )
      }
    }
    )
  ) : (
      <p>Cargando...</p>
    )

  return (
    <div className="container">
      <br />
      {ordersMarkup}
    </div>
  );
}

export default MyOrders;