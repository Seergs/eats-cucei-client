import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../food/Product'
const Dashboard = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  let recentProductsMarkup = products ? (
    products.map(product => <Product key={product.productId} product={product} />)
  ) : <p>Cargando...</p>
  return (
    <div className="container dashboard">
      <h3 className="text-center">Lo más comprado <span role="img" aria-label="delicious emoji face">😋</span></h3>
      {recentProductsMarkup}
    </div>
  );
}

export default Dashboard;