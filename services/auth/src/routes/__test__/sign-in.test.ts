import request from 'supertest';
import { app } from '../../app';
const urlSignIn = '/api/auth/sign-in';
const urlSignUp = '/api/auth/sign-up';
const username = 'username';
const email = 'email@gmail.com';
const password = 'password';

describe('Sign in fails', () => {
  it('Fails when 1 of 2 (username, password) or 2 is not provided', async () => {
    await request(app)
      .post(urlSignIn)
      .send({
        username,
        password,
      })
      .expect(400);

    await request(app).post(urlSignIn).send({}).expect(400);
  });

  it('Fails when 1 of 2 (username, password) is invalid', async () => {
    await request(app)
      .post(urlSignIn)
      .send({
        username: 'abc',
        password,
      })
      .expect(400);

    await request(app).post(urlSignIn).send({}).expect(400);
  });

  it('Fails when username not exists', async () => {
    await request(app)
      .post(urlSignIn)
      .send({
        username,
        password,
      })
      .expect(400);

    await request(app).post(urlSignIn).send({}).expect(400);
  });
});

describe('Sign in success without MFA', () => {
  it('Success when all fields provide is valid', async () => {
    await request(app)
      .post(urlSignUp)
      .send({
        username,
        password,
        email,
      })
      .expect(200);
    const user = await request(app).post(urlSignIn).send({ username, password }).expect(200);
    const { data } = user.body;
    expect(data.isSuccess).toEqual(true);
    expect(data.requiredMFA).toEqual(false);
  });
});

// describe('Sign in success without MFA', () => {
//   it('Success when all fields provide is valid', async () => {
//     await request(app)
//       .post(urlSignUp)
//       .send({
//         username,
//         password,
//         email,
//       })
//       .expect(200);
//     const user = await request(app).post(urlSignIn).send({ username, password }).expect(200);
//     const { data } = user.body;
//     expect(data.isSuccess).toEqual(true);
//     expect(data.requiredMFA).toEqual(false);
//   });
// });
