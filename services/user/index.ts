import dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env.local'})
import { connect } from 'mongoose';
import { app } from './src/app';
import { CONFIG } from './src/config';
import { natsClient } from './src/nats-client';
import { redisClient } from './src/redis-client';

const PORT = CONFIG.PORT;
(async function () {
  const stringConnect = CONFIG.MONGO_URI;
  try {
    // await natsClient.connect(CONFIG.NATS_CLUSTER_ID, CONFIG.NATS_CLIENT_ID, CONFIG.NATS_URL);
    // natsClient.client.on('close', () => {
    //   console.log('NATS connection closed!');
    //   process.exit();
    // });
    // process.on('SIGINT', () => natsClient.client.close());
    // process.on('SIGTERM', () => natsClient.client.close());

    await redisClient.connect(CONFIG.REDIS_HOST!, CONFIG.REDIS_PORT!);
    await connect(stringConnect, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to database');
  } catch (error) {
    console.log(`Error connecting to the database. \n${error}`);
  }
  app.listen(PORT, () => console.log(`Auth service listening on port ${PORT}`));
})();
