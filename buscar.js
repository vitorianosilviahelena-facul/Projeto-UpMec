// buscar.js - mostra um unico agendamento pelo id
// Uso: node buscar.js 1
const mysql = require("mysql2/promise");

async function main() {
  const idAgendamento = Number(process.argv[2]);
  if (!idAgendamento) {
    console.log("Informe o id do agendamento. Exemplo: node buscar.js 1");
    return;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "UpMec",
  });

  // O "?" é preenchido pelo valor do vetor: evita SQL injection
  const [agendamentos] = await conexao.execute(
    `
    SELECT a.idAGENDAMENTO, a.data_solicitacao, a.id_horario, a.status, a.observacao,
           u.email AS cliente, v.marca AS moto, v.placa,
           f.nome AS mecanico, s.nome AS servico
    FROM AGENDAMENTO a
    INNER JOIN CLIENTE c ON c.idCLIENTE = a.CLIENTE_idCLIENTE
    INNER JOIN USUARIO u ON u.id_usuario = c.USUARIO_id_usuario
    INNER JOIN VEICULOS v ON v.idVEICULOS = a.VEICULOS_idVEICULOS
    INNER JOIN FUNCIONARIOS f ON f.idFUNCIONARIOS = a.FUNCIONARIOS_idFUNCIONARIOS
    INNER JOIN SERVICOS s ON s.idSERVICOS = a.SERVICOS_idSERVICOS
    WHERE a.idAGENDAMENTO = ?
  `,
    [idAgendamento]
  );

  if (agendamentos.length === 0) {
    console.log("Agendamento nao encontrado.");
  } else {
    console.table(agendamentos);
  }

  await conexao.end();
}

main().catch((erro) => console.error("Erro:", erro.message));