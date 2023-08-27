import { env } from "node:process";
import CustomEnv from "../utils/CustomEnv.js";

await CustomEnv().config();

const { PORT, DB_USERNAME, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = env;

export default {
  app: {
    port: PORT || 2807,
  },
  postgres: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
};
