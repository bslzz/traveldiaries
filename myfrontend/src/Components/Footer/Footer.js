import React from 'react';

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <footer style={{ color: 'yellow', textAlign: 'center' }}>
      <p>Copyright © TravelDiaries {currentYear}. All rights reserved. </p>
    </footer>
  );
};

export default Footer;
