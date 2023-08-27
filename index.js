import config from "./src/config/default.js";
import PostgresDB from "./src/db/PostgresDB.js";
import { routes } from "./src/routes.js";
import CustomRouter from "./src/utils/CustomRouter.js";

const PORT = config.app.port;

const app = CustomRouter();
const db = new PostgresDB();
routes(app);

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Server is running on port ${PORT}`);
});
