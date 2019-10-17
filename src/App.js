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
import jwtDecode from 'jwt-decode';

import ProductDetails from './components/food/ProductDetails';
import PostProduct from './components/food/PostProduct';

import 'react-toastify/dist/ReactToastify.css';
import ModifyProduct from './components/food/ModifyProduct';




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
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/product/:productId' component={ProductDetails} />
            <Route path='/post' component={PostProduct} />
            <Route path='/product/:productId/update' component={ModifyProduct} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
