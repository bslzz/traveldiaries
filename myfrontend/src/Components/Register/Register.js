import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const { name, email, password, confirm_password } = user;
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    !name || !email || !password
      ? alert('All fields are mandatory')
      : password !== confirm_password
      ? alert('Passwords dont match')
      : axios({
          url: '/register',
          method: 'POST',
          data: {
            name,
            email,
            password,
            confirm_password,
          },
        })
          .then(() => {
            alert('Registration Successful');
            history.push('/login');
          })
          .catch((error) => {
            console.log('Error occured: ' + error);
          });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="">Name</label>
      <input name="name" value={name} onChange={changeHandler} type="text" />
      <label htmlFor="">Email</label>
      <input name="email" value={email} onChange={changeHandler} type="email" />
      <label htmlFor="">Password</label>
      <input
        name="password"
        value={password}
        onChange={changeHandler}
        type="password"
      />
      <label htmlFor="">Confirm Password</label>
      <input
        name="confirm_password"
        value={confirm_password}
        onChange={changeHandler}
        type="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
