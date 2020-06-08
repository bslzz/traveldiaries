import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavHeader from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MyMap from './Components/Map/MyMap';
import NotFound from './Components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

const App = () => {
  return (
    <Router>
      <NavHeader />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/mymap" component={MyMap} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
