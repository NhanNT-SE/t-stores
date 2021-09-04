import request from 'supertest';
import { app } from '../../app';
const urlSignUp = '/api/auth/sign-up';
const username = 'username';
const email = 'email@gmail.com';
const password = 'password';
describe('Feature sign up', () => {
  it('Fails when 1 of 3 (email, password, username) or 3 is not provided', async () => {
    await request(app)
      .post(urlSignUp)
      .send({
        password,
        email,
      })
      .expect(400);
    await request(app).post(urlSignUp).send({}).expect(400);
  });
  it('Fails when email is already exists', async () => {
    await request(app)
      .post(urlSignUp)
      .send({
        username,
        password,
        email,
      })
      .expect(200);
    await request(app)
      .post(urlSignUp)
      .send({
        username,
        password,
        email,
      })
      .expect(500);
  });
  it('Success when all fields provide is valid', async () => {
    await request(app)
      .post(urlSignUp)
      .send({
        username,
        password,
        email,
      })
      .expect(200);
  });
});
