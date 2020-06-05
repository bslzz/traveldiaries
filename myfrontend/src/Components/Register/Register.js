import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

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
      : !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/.test(
          email
        )
      ? alert('Invalid email')
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
    <>
      <form className="signForm" onSubmit={submitHandler}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            className="form-control"
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={changeHandler}
            className="form-control"
            placeholder="Confirm password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered?{' '}
          <Link style={{ color: 'yellow' }} to="/login">
            sign in
          </Link>
        </p>
      </form>
      <Footer />
    </>
  );
};

export default Register;
