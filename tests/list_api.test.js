const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');
const api = supertest(app);

const initialBlogs = [
  {
    'title': 'Blog Title #1',
    'author': 'Blog Author #1',
    'url': 'http://www.blog1.com',
    'likes': 1,
  },
  {
    'title': 'Blog Title #2',
    'author': 'Blog Author #2',
    'url': 'http://www.blog2.com',
    'likes': 2,
  },
  {
    'title': 'Blog Title #3',
    'author': 'Blog Author #3',
    'url': 'http://www.blog3.com',
    'likes': 3,
  },
  {
    'title': 'Blog Title #4',
    'author': 'Blog Author #4',
    'url': 'http://www.blog4.com',
    'likes': 4,
  }
];

beforeEach( async () => {
  let blogObj;
  await Blog.deleteMany({});

  blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[2]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[3]);
  await blogObj.save();
});

test('4.8 blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 60000);

test('4.8 there are four blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(4);
});

test('4.9 id exists', async () => {
  const { body } = await api.get('/api/blogs');

  expect(body[0].id).toBeDefined();
});

test('4.10 test POST route', async () => {
  const initialLength = initialBlogs.length;
  const newBlog = {
    'title': 'Blog Title #5',
    'author': 'Blog Author #5',
    'url': 'http://www.blog5.com',
    'likes': 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');
  const blogTitles = body.map(item => item.title);

  expect(body).toHaveLength(initialLength + 1);
  expect(blogTitles).toContain(newBlog.title);
});

test('4.11 likes attribute missing', async () => {
  const initialLength = initialBlogs.length;
  const newBlog = {
    'title': 'Blog Title #5',
    'author': 'Blog Author #5',
    'url': 'http://www.blog5.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');
  expect(body[initialLength].likes).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});