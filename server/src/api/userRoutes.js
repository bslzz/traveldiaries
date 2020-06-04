const express = require('express');
const router = express.Router();
const brcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.post(
  '/register',
  [
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password required').not().isEmpty(),
  ],
  (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }).then((savedUser) => {
      const errors = validationResult(req);
      if (!name || !email || !password) {
        return res.status(401).json({ msg: 'All fields must be filled' });
      }
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
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
  }
);

router.post(
  '/login',
  [
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password required').not().isEmpty(),
  ],
  (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then((savedUser) => {
      const errors = validationResult(req);
      if (!email || !password) {
        return res.status(401).json({ msg: 'Email and Password required' });
      }
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
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
  }
);

router.get('/userdata', (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => {
      msg: 'Error fetching DB users data', err;
    });
});

module.exports = router;
