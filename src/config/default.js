import { env } from "node:process";
import CustomEnv from "../utils/CustomEnv.js";

await CustomEnv().config();

export default {
  app: {
    port: env.PORT || 2807,
    debug: env.DEBUG === "active" || false,
  },
};
