import React from 'react';
import './Home.css';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <div className="row maintitle">
        <div className="col-lg-6 title">
          <h1>
            Welcome to TravelDiaries.{' '}
            <h2>Mark your visited place and keep memories.</h2>
          </h1>
        </div>
        <div className="col-lg-6 mappic">
          <img src="assets/worldmap.png" alt="map" />
        </div>
      </div>
    </Container>
  );
};

export default Home;
