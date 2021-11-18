const request = require('supertest');

const { app } = require('../src/app');
const { User } = require('../src/user/User');
const { sequelize } = require('../src/config/database');

beforeAll( () => sequelize.sync());
beforeEach(() => User.destroy({ truncate: true }));

const postUser = (username = 'user_default', email = 'user_default@gmail.com', password = 'password_default') => request(app)
  .post('/api/1.0/users')
  .send({
    username,
    email,
    password,
  });

describe('User registration', () => {
  it('Returns 200 OK when sigun request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it('Returns sucess message when sigup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('Save user to DB', async () => {
    await postUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('Save username an email to DB aaa', async () => {
    await postUser('user2', 'user2@gmail.com');
    const userList = await User.findAll();
    const userSave = userList[0];
    expect(userSave.username).toBe('user2');
    expect(userSave.email).toBe('user2@gmail.com');
  });

  it('Hashes te password in DB', async () => {
    await postUser();
    const userList = await User.findAll();
    const userSave = userList[0];
    expect(userSave.password).not.toBe('password_default');
  });

  it('Return 400 when usernames is null', async () => {
    const response = await postUser(null);
    expect(response.status).toBe(400);
  });

  it('Return validationsErrors field in response body when validation error occurrs', async () => {
    const response = await postUser(null);
    expect(response.body.validationsErrors).not.toBeUndefined();
  });

  it('Return validationsErrors.username field in response body when username is null', async () => {
    const response = await postUser(null);
    expect(response.body.validationsErrors.username).toBe('Username cannot be null');
  });

  it('Return validationsErrors.email field in response body when email is null', async () => {
    const response = await postUser('aaa', null);
    expect(response.body.validationsErrors.email).toBe('Email cannot be null');
  });

  it('Return erros for both when username and email is null', async () => {
    const { body } = await postUser(null, null);
    expect(Object.keys(body.validationsErrors)).toEqual( ['username', 'email']);
  });
});
