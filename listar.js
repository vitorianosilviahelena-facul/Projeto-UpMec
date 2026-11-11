// listar.js - mostra todos os agendamentos com cliente, moto, funcionario e servico
// Uso: node listar.js
const mysql = require("mysql2/promise");

async function main() {
  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "UpMec",
  });

  const [agendamentos] = await conexao.execute(`
    SELECT a.idAGENDAMENTO, a.data_solicitacao, a.id_horario, a.status,
           u.email AS cliente, v.marca AS moto, v.placa,
           f.nome AS mecanico, s.nome AS servico
    FROM AGENDAMENTO a
    INNER JOIN CLIENTE c ON c.idCLIENTE = a.CLIENTE_idCLIENTE
    INNER JOIN USUARIO u ON u.id_usuario = c.USUARIO_id_usuario
    INNER JOIN VEICULOS v ON v.idVEICULOS = a.VEICULOS_idVEICULOS
    INNER JOIN FUNCIONARIOS f ON f.idFUNCIONARIOS = a.FUNCIONARIOS_idFUNCIONARIOS
    INNER JOIN SERVICOS s ON s.idSERVICOS = a.SERVICOS_idSERVICOS
    ORDER BY a.idAGENDAMENTO
  `);

  console.table(agendamentos);

  await conexao.end();
}

main().catch((erro) => console.error("Erro:", erro.message));