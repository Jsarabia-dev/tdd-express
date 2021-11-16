const request = require('supertest');

const { app } = require('../src/app');
const { User } = require('../src/user/User');
const { sequelize } = require('../src/config/database');

beforeAll( () => sequelize.sync());
beforeEach(() => User.destroy({ truncate: true }));

const postValidUser = (username = 'user_default', email = 'user_default@gmail.com', password = 'password_default') => request(app)
  .post('/api/1.0/users')
  .send({
    username,
    email,
    password,
  });

describe('User registration', () => {
  it('Returns 200 OK when sigun request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it('Returns sucess message when sigup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created');
  });

  it('Save user to DB', async () => {
    await postValidUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('Save username an email to DB aaa', async () => {
    await postValidUser('user2', 'user2@gmail.com');
    const userList = await User.findAll();
    const userSave = userList[0];
    expect(userSave.username).toBe('user2');
    expect(userSave.email).toBe('user2@gmail.com');
  });

  it('Hashes te password in DB', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const userSave = userList[0];
    expect(userSave.password).not.toBe('password_default');
  });
});
