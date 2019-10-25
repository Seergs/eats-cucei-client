import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from './Product';

const SearchProduct = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setOriginalProducts(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleChange = e => setSearch(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (search === '') {
      setProducts(originalProducts);
    }
    else {
      const newProducts = originalProducts.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      setProducts(newProducts);
    }
  }

  let displayProducts = products && products.map(product => (
    <Link className="dashboard-link-product" to={`/product/${product.productId}`} key={product.productId}>
      <Product product={product} />
    </Link>
  ))

  return (
    <div className=" dashboard container">
      <br />
      <h3 className="text-center">Busca tu comida favorita</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Producto" onChange={e => handleChange(e)} value={search} />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">Buscar</button>
          </div>
        </div>
      </form>
      {displayProducts}
    </div>
  );
}

export default SearchProduct;