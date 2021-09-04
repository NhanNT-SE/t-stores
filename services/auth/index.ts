import { connect } from "mongoose";
import { app } from "./src/app";
import { CONFIG } from "./src/config";
import { redisClient } from "./src/redis-client";
// import { redisHelper } from "./src/redis-helper";

const PORT = CONFIG.PORT;
(async function () {
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI must be define");
  // }
  const stringConnect = process.env.MONGO_URI || "mongodb://localhost/t-stores";
  try {
    await redisClient.connect(CONFIG.REDIS_HOST, CONFIG.REDIS_PORT);
    await connect(stringConnect, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to the database. \n${error}`);
  }
  app.listen(PORT, () => console.log(`Auth service listening on port ${PORT}`));
})();
