import { redisHelper } from "@tstores/common";
import { connect } from "mongoose";
import { app } from "./app";
import { CONFIG } from "./config";

const PORT = 3000 || process.env.PORT;
(async function () {
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI must be define");
  // }
  const stringConnect = process.env.MONGO_URI || "mongodb://localhost/t-stores";
  try {
    await redisHelper.connect(CONFIG.REDIS_HOST, CONFIG.REDIS_PORT);
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
