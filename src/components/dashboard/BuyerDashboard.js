import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../food/Product'

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products').then(res => {
      setProducts(res.data);
    })
      .catch(err => console.log(err));
  }, []);
  if (products) {
    return (
      <div className="dashboard container">
        <br />
        <h3 className="text-center">Lo más comprado<span role="img" aria-label="emoji">😋</span></h3>
        <br />
        {products && products.map(product => (
          <Link className="dashboard-link-product" to={`/product/${product.productId}`} key={product.productId}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    )
  } else {
    return <p>Cargando...</p>
  }
}

export default BuyerDashboard;