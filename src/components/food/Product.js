import React from 'react'

const Product = ({ product }) => {
  return (
    <div className="card">
      <div className="card-body">
        <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-score">Calificación: {product.score}</p>
      </div>
    </div >
  );
}

export default Product;