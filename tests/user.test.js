const request = require('supertest');
const app = require('../src/app');

test('Should singup a new user', async () => {
    await request(app).post('/users').send({
        name: 'test_name',
        email: 'test@email.com',
        password: 'testpass1'
    }).expect(201);
});