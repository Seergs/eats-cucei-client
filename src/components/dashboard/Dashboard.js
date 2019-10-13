import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../food/Product'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Dashboard = ({ enabled, accountType, authenticated }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (authenticated && authenticated === true) {
      axios.get('/products')
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [enabled, accountType, authenticated])

  if (authenticated != null && authenticated === false) return <Redirect to='/login' />
  if (enabled != null && enabled === false) return <Redirect to='/login' />
  else {
    if (products) return (
      <div className="container dashboard">
        <h3 className="text-center">Lo más comprado <span role="img" aria-label="delicious emoji face">😋</span></h3>
        {
          products && products.map(product => {
            return (
              <Link to={`/product/${product.productId}`} key={product.productId}>
                <Product product={product} />
              </Link>
            )
          })
        }
      </div>
    )
    else {
      return <p>Cargando...</p>
    }
  }
}
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  enabled: state.user.credentials.enabled,
  accountType: state.user.credentials.accountType
})

export default connect(mapStateToProps)(Dashboard);