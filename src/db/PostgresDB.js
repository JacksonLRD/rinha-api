import pkg from "pg";

import config from "../config/default.js";
import AppError from "../utils/AppError.js";

export default class PostgresDB {
  static #pool;

  async connect() {
    const { Pool } = pkg;
    const { user, host, database, password, port } = config.postgres;

    PostgresDB.#pool = new Pool({
      host,
      port,
      user,
      database,
      password,
    });

    try {
      await PostgresDB.#pool.connect();
      console.info("Postgres Database Connected!");
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async close() {
    try {
      await PostgresDB.#pool.end();
      console.info("Postgres Database Disconnected!");
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async query(queryString, params) {
    return PostgresDB.#pool.query(queryString, params);
  }
}
