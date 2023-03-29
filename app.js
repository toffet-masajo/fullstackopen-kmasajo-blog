const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info('connecting to database...');
mongoose.connect(config.MONGODB_URL)
  .then(() => logger.info('connected to database!'))
  .catch((error) => logger.error('database connection error:', error.message));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;