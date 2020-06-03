import React from 'react';
import './Home.css';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <Container>
      <div className="row maintitle">
        <div className="col-xl-6 title">
          <h1>
            Welcome to TravelDiaries.{' '}
            <h2>Mark your visited places and keep memories.</h2>
          </h1>
        </div>
        <div className="col-xl-6 mappic">
          <img src="assets/worldmap.png" alt="map" />
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Home;
