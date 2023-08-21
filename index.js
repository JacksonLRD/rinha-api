import config from "./src/config/default.js";
import CustomRouter from "./src/utils/CustomRouter.js";

const PORT = config.app.port;

const app = CustomRouter();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
