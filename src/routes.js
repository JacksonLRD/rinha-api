import Controller from "./controllers/Controllers.js";

export const routes = (app) => {
  app.post("/pessoas", Controller.register);
  app.get("/pessoas", Controller.getAll);
};
