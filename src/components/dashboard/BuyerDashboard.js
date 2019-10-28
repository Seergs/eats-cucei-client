import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from '../food/Product'
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/dataActions';

const BuyerDashboard = (props) => {
  useEffect(() => {
    props.getProducts();
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
      <h3 className="text-center">Lo más comprado<span role="img" aria-label="emoji">😋</span></h3>
      <br />
      {productsMarkup}
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getProducts })(BuyerDashboard);