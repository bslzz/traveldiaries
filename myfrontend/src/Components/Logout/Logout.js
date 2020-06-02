import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const removeItem = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <Link
      style={{
        position: 'absolute',
        top: '5px',
        right: '5%',
        fontSize: '1.2rem',
      }}
      onClick={removeItem}
      to="/"
    >
      Logout
    </Link>
  );
};

export default Logout;
