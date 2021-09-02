import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from './src/app';

jest.mock('./src/redis-helper.ts');
let mongo: MongoMemoryServer;
declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string>;
    }
  }
}
beforeAll(async () => {
  process.env.JWT_KEY = 'test-secret';
  //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signIn = async () => {
  const username = 'nhan-nt';
  const email = 'nhan@gmail.com';
  const password = '123456';
  await request(app)
    .post('/api/auth/sign-up')
    .send({
      username,
      email,
      password,
    })
    .expect(200);
  const response = await request(app)
    .post('/api/auth/sign-in')
    .send({ username, password })
    .expect(200)
  const cookie = response.get('Set-Cookie');
  console.log(response.body);

  return 'cookie';
};
