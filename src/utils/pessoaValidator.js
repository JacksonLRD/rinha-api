import AppError from "./AppError.js";

function pessoaValidator() {
  let error;
  let value;

  function validate(pessoa) {
    if (!pessoa.apelido) {
      error = new AppError('O campo "apelido" e obrigatório', 422);
    }

    if (typeof pessoa.apelido !== "string") {
      error = new AppError(
        'O campo "apelido" precisa ser do tipo "String"',
        400
      );
    }

    if (!pessoa.nome) {
      error = new AppError('O campo "nome" e obrigatório', 422);
    }

    if (typeof pessoa.nome !== "string") {
      error = new AppError('O campo "nome" precisa ser do tipo "String"', 400);
    }

    if (pessoa.stack) {
      console.log(pessoa.stack);
      const cb = (i) => typeof i === "string";
      const flag = pessoa.stack.every(cb);

      console.log();

      if (!flag)
        error = new AppError(
          'O campo "stack" deve ser um array de strings',
          400
        );
    }

    value = pessoa;

    return {
      error,
      value,
    };
  }

  return { validate };
}

export default pessoaValidator;
