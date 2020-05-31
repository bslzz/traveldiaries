import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitLogin = (e) => {
    e.preventDefault();
    !email || !password
      ? alert('Email and Password are required')
      : axios({
          url: '/login',
          method: 'POST',
          data: {
            email,
            password,
          },
        })
          .then((response) => {
            history.push('/mymap');
            const isAuthenticated = response.data.isAuthenticated;
            window.localStorage.setItem('isAuthenticated', isAuthenticated);
          })
          .catch((error) => {
            alert('User not found. ' + error.message);
          });
  };

  return (
    <form onSubmit={submitLogin}>
      <label htmlFor="">Email</label>
      <input name="email" value={email} onChange={changeHandler} type="text" />
      <label htmlFor="">Password</label>
      <input
        name="password"
        value={password}
        onChange={changeHandler}
        type="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
