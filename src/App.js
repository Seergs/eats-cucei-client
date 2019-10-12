import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Layout components
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
