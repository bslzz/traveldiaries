const express = require('express');
const router = express.Router();
const brcrypt = require('bcryptjs');
const User = require('../models/UserSchema');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ msg: 'Email and Password required' });
  }

  await User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      res.status(422).json('User alreade exists');
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
          res.status(200).json({ msg: 'New user saved to DB' });
          console.log(req.body);
        })
        .catch((err) => {
          res.status(422).json({ msg: 'Error saving new user to DB' });
        });
    });
  });
});

module.exports = router;
