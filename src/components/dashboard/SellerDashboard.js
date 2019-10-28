import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../food/Product'
import axios from 'axios';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/my-products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let productsMarkup = products ? (
    products.map(product => (
      <Link className="dashboard-link-product" to={`/product/${product.productId}`} key={product.productId}>
        <Product product={product} />
      </Link>
    ))
  ) : (
      <p>Cargando...</p>
    )
  return (
    <div className="dashboard container">
      <br />
      <h3 className="text-center">Mis productos</h3>
      <br />
      {productsMarkup}
    </div>
  )
}

export default SellerDashboard;