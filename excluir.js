// excluir.js - exclui um agendamento pelo id
// Uso: node excluir.js 11
const mysql = require("mysql2/promise");

async function main() {
  const idAgendamento = Number(process.argv[2]);

  if (!idAgendamento) {
    console.log("Informe o id do agendamento. Exemplo: node excluir.js 11");
    return;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "UpMec",
  });

  // O "?" é preenchido pelo valor do vetor: evita SQL injection
  try {
    const [resultado] = await conexao.execute(
      "DELETE FROM AGENDAMENTO WHERE idAGENDAMENTO = ?",
      [idAgendamento]
    );

    if (resultado.affectedRows === 0) {
      console.log("Agendamento nao encontrado.");
    } else {
      console.log(`Agendamento ${idAgendamento} excluido com sucesso.`);
    }
  } catch (erro) {
    if (erro.code === "ER_ROW_IS_REFERENCED_2") {
      console.log("Nao e possivel excluir: este agendamento ja possui orcamento ou pagamento vinculado.");
    } else {
      throw erro;
    }
  } finally {
    await conexao.end();
  }
}

main().catch((erro) => console.error("Erro:", erro.message));