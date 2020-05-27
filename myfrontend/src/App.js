import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyMap from './Components/Map/MyMap';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import NavHeader from './Components/Navbar/Navbar';

require('dotenv').config();

const App = () => {
  return (
    <div className="page-container">
    <div className="content-wrap">
    <Router>
      <NavHeader />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <MyMap />
      </Router>
    </div>
    </div>
  );
};

export default App;
