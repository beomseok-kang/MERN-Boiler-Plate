const express = require('express');
const cors = require('cors');

const userRouter = require('./user');

const router = express.Router();

router.use(cors({
  credentials: true
}));
router.use('/user', userRouter);

module.exports = router;