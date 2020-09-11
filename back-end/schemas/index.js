const mongoose = require('mongoose');
const { mongoURI, dbName } = require('../config/key');
const { NODE_ENV } = process.env;

// connect to mongo db atlas
const connectToMongoDB = () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  mongoose.connect(mongoURI, {
    dbName,
    useNewUrlParser: true,
    useCreateIndex: true
  }, (err) => {
    if (err) {
      console.error('MongoDB Connection Error: ', err);
    } else {
      console.log('MongoDB Connected');
    }
  });
};

// Error Handler
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error: ', err);
});

// Mongo DB Disconnection Issue
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected. Reconnecting...');
  connectToMongoDB();
});

module.exports = connectToMongoDB;