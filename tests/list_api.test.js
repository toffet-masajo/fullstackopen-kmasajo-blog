const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

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

afterAll(async () => {
  await mongoose.connection.close();
});