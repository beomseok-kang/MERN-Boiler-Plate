const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../schemas/user');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares/auth');
const { tokenIssuer } = require('../../config/dev');
const { verifyToken } = require('../middlewares/jwt');

const router = express.Router();

router.post('/register', isNotLoggedIn, async (req, res, next) => {
  const { nickName, email, password } = req.body;
  try {
    const hashPW = await bcrypt.hash(password, 12);
    const user = await User.create({
      nickName,
      email,
      password: hashPW
    });
    console.log(user);
    res.status(201).json({
      code: 200,
      registerSuccess: true
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// login router, returns user data and token.
router.post('/login', isNotLoggedIn, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isCorrectPW = await bcrypt.compare(password, user.password);
    // if result available
    if (isCorrectPW) {
      const token = jwt.sign({
        _id: user._id,
        nickName: user.nickName,
        email: user.email
      }, process.env.JWT_SECRET, {
        // 7 days to expire
        expiresIn: '1d',
        issuer: tokenIssuer
      });
      return res.json({
        code: 200,
        loginSuccess: true,
        user,
        token
      });    
    } else {
      return res.json({
        loginSuccess: false,
        message: 'The password is incorrect.'
      });
    }
  } else {
    return res.json({
      loginSuccess: false,
      message: 'The user does not exist.'
    });
  }
});

router.get('/data', isLoggedIn, verifyToken, (req, res) => {
  return res.json(req.decoded);
});

module.exports = router;