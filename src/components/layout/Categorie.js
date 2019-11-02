import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../food/Product';

const Categorie = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/tags/${props.match.params.tag}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err));
  }, [props.match.params.tag])

  let productsMarkup = data ? (
    data.map(product => (
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
      <h3 className="text-center">Categoría: {props.match.params.tag}</h3>
      <br />
      {productsMarkup}
    </div>
  )
}

export default Categorie;