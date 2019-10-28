import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from '../food/Product'
import { connect } from 'react-redux';
import { getMyProducts } from '../../redux/actions/dataActions';

const SellerDashboard = (props) => {
  useEffect(() => {
    props.getMyProducts();
  }, []);

  const { products, loading } = props.data;

  let productsMarkup = !loading ? (
    products.map(product => (
      <Link className="dashboard-link-product" to={`/product/${product.productId}`} key={product.productId}>
        <Product product={product} />
      </Link>
    ))
  ) : (
      <p>Cargando...</p>
    );

  return (
    <div className="dashboard container">
      <br />
      <h3 className="text-center">Mis productos</h3>
      <br />
      {productsMarkup}
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getMyProducts })(SellerDashboard);