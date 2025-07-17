const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/index');

const request = supertest(app);

describe('Todo API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://test:test@mongodb:27017/test', {
      auth: { username: 'test', password: 'test' }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a todo', async () => {
    const res = await request.post('/api/todos').send({ title: 'Test Todo' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Todo');
  });
});