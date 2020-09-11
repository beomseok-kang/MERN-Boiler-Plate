/**
 * This is the entry point of the back-end of the boiler plate.
 * The project is based on MERN stack, and therefore the back-end
 * of this project will be built on Express.
 * 
 * The back-end stacks and libraries used can be found on package.json
 * file.
 */


// Packages and Modules require
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

// Middlewares / Other requires
const connectToMongoDB = require('./schemas');

const userRouter = require('./routes/api/user');

// App, passport configuration, mongoDB connection
const app = express();
connectToMongoDB();

// Middlewares run
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));



// Routers

/// Routers - /api
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('hello world!');
});

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'production' ? {} : err;
  res.status(err.status || 500);
  res.json({
    message: 'An error has occurred.',
    error: err
  });
})

app.listen(5000);