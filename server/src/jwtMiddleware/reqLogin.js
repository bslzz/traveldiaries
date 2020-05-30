const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// to make sure only logged in user can see the data, use of token for the users

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json('You must be logged in to see the data');
  }
  const token = authorization.replace('Monkey ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json('you are not logged in');
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
