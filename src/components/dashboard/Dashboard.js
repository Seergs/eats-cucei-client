import React from 'react';
import { connect } from 'react-redux';
import SellerDashBoard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import { Redirect } from 'react-router-dom'

const Dashboard = (props) => {

  const authenticated = props.authenticated;
  const accountType = props.accountType;
  const enabled = props.enabled;

  if (authenticated) {
    if (enabled) {
      if (accountType) {
        if (accountType === 'sellers') return <SellerDashBoard />
        else return <BuyerDashboard />
      } else {
        return <p>Cargando...</p>
      }
    } else {
      return <p>Cargando...</p>
    }
  } else {
    return <Redirect to='/login' />
  }

}
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  enabled: state.user.credentials.enabled,
  accountType: state.user.credentials.accountType
})

export default connect(mapStateToProps)(Dashboard);