import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../food/Product'

const SellerDashboard = () => {
  const [ownProducts, setOwnProducts] = useState([]);

  useEffect(() => {
    axios.get('/my-products').then(res => {
      setOwnProducts(res.data);
    })
      .catch(err => console.log(err));
  }, []);

  if (ownProducts) {
    return (
      <div className=" dashboard container">
        <br />
        <h3>Mis productos</h3>
        {ownProducts && ownProducts.map(product => (
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


export default SellerDashboard;