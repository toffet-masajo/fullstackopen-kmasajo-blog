const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const Blog = require('./models/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info('connecting to database...');
mongoose.connect(config.MONGODB_URL)
  .then(() => logger.info('connected to database!'))
  .catch((error) => logger.error('database connection error:', error.message));

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;