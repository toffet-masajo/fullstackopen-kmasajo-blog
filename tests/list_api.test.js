const mongoose = require('mongoose');
const supertest = require('supertest');

const { initialBlogs, blogsInDb } = require('./test_helper');
const Blog = require('../models/blogs');
const app = require('../app');
const api = supertest(app);

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

test('4.12 title attribute missing', async () => {
  const newBlog = {
    'author': 'Blog Author #5',
    'url': 'http://www.blog5.com',
    'likes': 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('4.12 url attribute missing', async () => {
  const newBlog = {
    'title': 'Blog Title #5',
    'author': 'Blog Author #5',
    'likes': 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('4.13 delete existing blog entry', async () => {
  const oldBlogs = await blogsInDb();
  const blogToDelete = oldBlogs[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const newBlogs = await blogsInDb();
  expect(newBlogs).toHaveLength(oldBlogs.length - 1);
});

test('4.13 delete non-existing blog entry', async () => {
  const oldBlogs = await blogsInDb();
  const blogToDelete = '123456789abcdef123456789';

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});