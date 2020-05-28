import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavHeader from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MyMap from './Components/Map/MyMap';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

const App = () => {
  return (
    <div className="homepage">
      <Router>
        <NavHeader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/mymap" exact component={MyMap} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
