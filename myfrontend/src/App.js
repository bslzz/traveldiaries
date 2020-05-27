import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyMap from './Components/Map/MyMap';
require('dotenv').config();

const App = () => {
  return (
    <Router>
      <MyMap />
    </Router>
  );
};

export default App;
