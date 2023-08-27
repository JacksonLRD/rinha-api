import PostgresDB from "../db/PostgresDB.js";

export default class Repository {
  #db;

  constructor() {
    this.#db = new PostgresDB();
  }

  async save(pessoa) {
    const { apelido, nome, nascimento, stack } = pessoa;
    const values = [apelido, nome, nascimento, stack];
    const query = `INSERT INTO pessoas (apelido, nome, nascimento, stack) VALUES ($1, $2, $3, $4)`;

    await this.#db.query(query, values);

    return {
      apelido,
      stack,
    };
  }

  async listAll() {
    const query = `SELECT * FROM pessoas ORDER BY apelido ASC`;

    const { rows } = await this.#db.query(query);

    return rows;
  }
}
