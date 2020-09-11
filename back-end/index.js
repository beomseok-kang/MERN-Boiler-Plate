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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

// Middlewares / Other requires
const connectToMongoDB = require('./schemas');

const userRouter = require('./routes/api/user');

// App and Mongo DB Connection
const app = express();
connectToMongoDB();

// Middlewares run
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routers

/// Routers - /api
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(5000);