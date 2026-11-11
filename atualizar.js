// atualizar.js - atualiza o status e a observacao de um agendamento
// Uso: node atualizar.js 11 "Confirmado" "Cliente confirmou por WhatsApp"
const mysql = require("mysql2/promise");

async function main() {
  const idAgendamento = Number(process.argv[2]);
  const novoStatus = process.argv[3];
  const novaObservacao = process.argv[4];

  if (!idAgendamento || !novoStatus || !novaObservacao) {
    console.log('Informe o id, status e observacao. Exemplo: node atualizar.js 11 "Confirmado" "Cliente confirmou por WhatsApp"');
    return;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "UpMec",
  });

  // O "?" é preenchido pelo valor do vetor: evita SQL injection
  const [resultado] = await conexao.execute(
    "UPDATE AGENDAMENTO SET status = ?, observacao = ? WHERE idAGENDAMENTO = ?",
    [novoStatus, novaObservacao, idAgendamento]
  );

  if (resultado.affectedRows === 0) {
    console.log("Agendamento nao encontrado.");
  } else {
    console.log(`Agendamento ${idAgendamento} atualizado com sucesso.`);
  }

  await conexao.end();
}

main().catch((erro) => console.error("Erro:", erro.message));