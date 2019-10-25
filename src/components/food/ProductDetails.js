import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductDetailsSeller from './ProductDetailsSeller';
import ProductDetailsBuyer from './ProductDetailsBuyer';
import axios from 'axios';


const ProductDetails = (props) => {
  const productId = props.match.params.productId;
  const authenticated = props.user.authenticated;
  const accountType = props.user.credentials.accountType;
  const enabled = props.user.credentials.enabled;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [productId])

  if (authenticated) {
    if (enabled) {
      if (enabled === true) {
        if (accountType) {
          if (product) {
            if (accountType === 'sellers') return <ProductDetailsSeller product={product} />
            else return <ProductDetailsBuyer product={product} />
          } else return <p>Cargando...</p>
        } else return <p>Cargando...</p>
      } else return <Redirect to='/' />
    } else return <p>Cargando...</p>
  } else {
    return <Redirect to='/login' />
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ProductDetails);