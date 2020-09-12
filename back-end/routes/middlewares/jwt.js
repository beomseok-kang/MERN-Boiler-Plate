/**
 * The user will send the token into req.headers.authorization.
 * Then, jwt module will verify the token using jwt.verify() method,
 * and if the verification successes, the token's payload data will
 * be put into req.decoded. Using req.decoded, other middlewares can
 * now check the data inside the token.
 */

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'The token has expired.'
      });
    } 
    return res.status(401).json({
      code: 401,
      message: 'Invalid token.'
    });
  }
};

module.exports = { verifyToken };