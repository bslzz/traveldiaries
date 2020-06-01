const express = require('express');
const router = express.Router();
const brcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401).json({ msg: 'All fields must be filled' });
  }
  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json('User already exists');
    }

    brcrypt.hash(password, 10).then((hashedPassword) => {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      newUser
        .save()
        .then((user) => {
          return res.status(200).json({ msg: 'New user saved to DB' });
          console.log(req.body);
        })
        .catch((err) => {
          console.log({ msg: 'Error saving new user to DB :' + err });
        });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ msg: 'Email and Password required' });
  }

  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ msg: 'No user found' });
    }
    brcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          res.json({ token });
        } else {
          res.status(422).json('Invalid email or password');
        }
      })
      .catch((err) => {
        console.log(`Error logging in: ${err}`);
      });
  });
});

module.exports = router;
