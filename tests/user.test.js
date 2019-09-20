const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, userToInsert, setDatabase } = require('./fixtures/db');

beforeEach(setDatabase);

test('Should singup a new user', async () => {
    const response = await request(app).post('/users').send(userToInsert).expect(201);

    const userCreated = User.findById(response.body.user._id);

    expect(userCreated).not.toBeNull();
    expect(response.body.user.name).toBe(userToInsert.name)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexisten user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password:"qwerty"
    }).expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/myprofile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthorized user', async () => {
  await request(app)
    .get('/users/myprofile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}121`)
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/myprofile')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/myprofile')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}212`)
        .send()
        .expect(401);     
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/myprofile/avatar')
        .set(`Authorization`, `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/people.jpg')
        .expect(200)
});

