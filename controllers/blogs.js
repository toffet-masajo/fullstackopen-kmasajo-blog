const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Blog = require('../models/blogs');
const User = require('../models/users');

router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user');
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);
  if(result === null) response.status(400).json({ error: 'blog not found' });
  else response.status(200).json(result);
});

router.post('/', async (request, response, next) => {
  const body = request.body;
  if(!('likes' in body))
    body.likes = 0;
  if(!('title' in body))
    return response.status(400).json({ error: 'title missing' });
  else if(!('url' in body))
    return response.status(400).json({ error: 'url missing' });
  try {
    const token = jwt.verify(request.token, process.env.SECRET);
    if(!token.id)
      return response.status(401).json({ error: 'invalid token' });

    const user = await User.findById(token.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id.toString()
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, context: 'query' });
  if(result === null) response.status(400).json({ error: 'blog not found' });
  else response.json(result);
});

router.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  if(result === null) response.status(400).json({ error: 'blog not found' });
  else response.status(204).json({ message: 'blog deleted' });
});

module.exports = router;