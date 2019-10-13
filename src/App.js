import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logOutUser, getUserData } from './redux/actions/userActions'

//Layout components
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard';

//Auth components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthRoute from './components/auth/AuthRoute';

import jwtDecode from 'jwt-decode';
import AuthRouteDasboard from './components/auth/AuthRouteDasboard';
import ProductDetails from './components/food/ProductDetails';
import PostProduct from './components/food/PostProduct';


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <AuthRouteDasboard exact path='/' component={Dashboard} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRouteDasboard path='/product/:productId' component={ProductDetails} />
            <Route path='/post' component={PostProduct} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
