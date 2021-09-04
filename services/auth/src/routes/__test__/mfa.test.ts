import request from 'supertest';
import { app } from '../../app';
const baseUrl = '/api/auth/mfa';

describe('Feature MFA', () => {
  it('Can not generate qr code when user not logged', async () => {
    await request(app)
      .post(`${baseUrl}/qr-code`)
      .send({
        password: 'password',
      })
      .expect(401);
  });

  it('Can not generate qr code when user not supplied password', async () => {
    await request(app).post(`${baseUrl}/qr-code`).send({}).expect(400);
  });

  it('Generate qr code successful', async () => {
    const cookie = await global.signIn();
    const response = await request(app)
      .post(`${baseUrl}/qr-code`)
      .set('Cookie', cookie)
      .send({
        password: '123456',
      })
      .expect(200);
    expect(response.body.data.qrCode).toBeDefined();
  });
});
