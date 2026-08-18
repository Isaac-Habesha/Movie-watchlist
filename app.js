const express = require('express');
const dotenv = require('dotenv');
const moviesRouter = require('./routes/movies');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use('/api/movies', moviesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
