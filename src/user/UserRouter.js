const express = require('express');

const UserService = require('./UserService');

const router = express.Router();

const userValidatorMiddleware = (req, res, next) => {
  let validationsErrors = null;
  const { username, email } = req.body;
  if (!username) validationsErrors = { username: 'Username cannot be null' };
  if (!email) validationsErrors = { ...validationsErrors, email: 'Email cannot be null' };
  if (validationsErrors) return res.status(400).json({ validationsErrors });

  next();
};

router.post(
  '/api/1.0/users',
  [userValidatorMiddleware],
  async (req, res) => {
    const { username, email, password } = req.body;
    const userSaved = await UserService.save({ username, email, password });
    res.send({ message: 'User created', userSaved });
  },
);

module.exports = router;
