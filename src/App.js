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

import ModifyProduct from './components/food/ModifyProduct';
import SearchProduct from './components/food/SearchProduct';
import AllOrders from './components/orders/AllOrders';
import MyOrders from './components/orders/MyOrders';
import Categories from './components/layout/Categories';
import Categorie from './components/layout/Categorie';
import Profile from './components/layout/Profile';
import EditProfile from './components/user/EditProfile';
import Stats from './components/layout/Stats';

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
            <Route path='/search' component={SearchProduct} />
            <Route path='/orders' component={AllOrders} />
            <Route path='/my-orders' component={MyOrders} />
            <Route exact path='/tags' component={Categories} />
            <Route path='/tags/:tag' component={Categorie} />
            <Route path='/profile/edit' component={EditProfile} />
            <Route path='/profile/:userId' component={Profile} />
            <Route path='/statistics' component={Stats} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
