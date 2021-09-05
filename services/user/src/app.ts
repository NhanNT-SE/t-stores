import { currentUser, errorHandle, NotFoundError } from '@tstores/common';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { redisClient } from './redis-client';


const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  try {
    req.redisClient = redisClient.client;
    next();
  } catch (error) {
    next(error);
  }
});
app.use(currentUser);
app.use((req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandle);
export { app };
