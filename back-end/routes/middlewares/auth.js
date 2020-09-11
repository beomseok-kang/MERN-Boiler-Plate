const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    next();
  } else {
    res.status(403).send('You need to log in.');
  }
};

const isNotLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next();
  } else {
    res.json({
      message: 'You are already logged in.'
    });
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };