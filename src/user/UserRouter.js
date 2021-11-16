const express = require('express');

const UserService = require('./UserService');

const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  console.log('[+] BODY -> ', req.body);
  const userSaved = await UserService.save(req.body);

  res.send({ message: 'User created', userSaved });
});

module.exports = router;
