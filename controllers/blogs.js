const router = require('express').Router();

const Blog = require('../models/blogs');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const body = request.body;
  if(!('likes' in body))
    body.likes = 0;

  const blog = new Blog(body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = router;