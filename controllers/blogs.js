const router = require('express').Router();

const Blog = require('../models/blogs');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);
  if(result === null) response.status(400).json({ error: 'blog not found' });
  else response.status(200).json(result);
});

router.post('/', async (request, response) => {
  const body = request.body;
  if(!('likes' in body))
    body.likes = 0;
  else if(!('title' in body))
    response.status(400).json({ error: 'title missing' });
  else if(!('url' in body))
    response.status(400).json({ error: 'url missing' });
  else {
    const blog = new Blog(body);
    const result = await blog.save();
    response.status(201).json(result);
  }
});

router.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  if(result === null) response.status(400).json({ error: 'blog not found' });
  else response.status(204).json({ message: 'blog deleted' });
});

module.exports = router;