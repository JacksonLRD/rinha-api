import { once } from "node:events";

import { DEFAULT_HEADER } from "../utils/constants.js";
import pessoaValidator from "../utils/pessoaValidator.js";
import Repository from "../repositories/Repository.js";

export default class Controller {
  static #repository = new Repository();

  static async register(req, res) {
    const data = await once(req, "data");

    const { value, error } = pessoaValidator().validate(JSON.parse(data));
    if (error) throw error;

    const pessoa = await Controller.#repository.save(value);

    res.writeHead(201, DEFAULT_HEADER);
    res.write(
      JSON.stringify({
        message: "Pessoa added successfully!",
        pessoa,
      })
    );
    return res.end();
  }

  static async getAll(req, res) {
    const pessoas = await Controller.#repository.listAll();

    res.writeHead(200, DEFAULT_HEADER);
    res.write(JSON.stringify(pessoas));
    return res.end();
  }
}
