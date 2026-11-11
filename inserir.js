// inserir.js - cadastra um novo agendamento no banco
// Uso: node inserir.js "15:00:00" "2026-11-18" "Pendente" "Revisao preventiva" 1 1 2 1
const mysql = require("mysql2/promise");

async function main() {
  const horario = process.argv[2];
  const data = process.argv[3];
  const status = process.argv[4];
  const observacao = process.argv[5];
  const idCliente = Number(process.argv[6]);
  const idVeiculo = Number(process.argv[7]);
  const idFuncionario = Number(process.argv[8]);
  const idServico = Number(process.argv[9]);

  if (!horario || !data || !status || !observacao || !idCliente || !idVeiculo || !idFuncionario || !idServico) {
    console.log('Informe todos os dados. Exemplo: node inserir.js "15:00:00" "2026-11-18" "Pendente" "Revisao preventiva" 1 1 2 1');
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
      `INSERT INTO AGENDAMENTO
       (id_horario, data_solicitacao, status, observacao, CLIENTE_idCLIENTE, VEICULOS_idVEICULOS, FUNCIONARIOS_idFUNCIONARIOS, SERVICOS_idSERVICOS)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [horario, data, status, observacao, idCliente, idVeiculo, idFuncionario, idServico]
    );
    console.log(`Agendamento cadastrado com id ${resultado.insertId}.`);
  } catch (erro) {
    if (erro.code === "ER_NO_REFERENCED_ROW_2") {
      console.log("Erro: cliente, veiculo, funcionario ou servico informado nao existe.");
    } else {
      throw erro;
    }
  } finally {
    await conexao.end();
  }
}

main().catch((erro) => console.error("Erro:", erro.message));