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
        right: '8%',
        fontSize: '1.4rem',
        fontWeight: '700',
        color: '#0d47a1',
      }}
      onClick={removeItem}
      to="/"
    >
      <i className="fas fa-sign-out-alt">Logout</i>
    </Link>
  );
};

export default Logout;
