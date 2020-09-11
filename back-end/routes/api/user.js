const express = require('express');
const { User } = require('../../schemas/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { nickName, email, password } = req.body;
  try {
    const user = await User.create({
      nickName,
      email,
      password
    });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get('/')

module.exports = router;