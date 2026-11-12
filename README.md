# Projeto Final – Sistema UpMec (CRUD em Node.js + MySQL)

**Banco do Projeto:** `UpMec`  
**Tabela Principal Escolhida:** `AGENDAMENTO` (relacionada via chaves estrangeiras com `CLIENTE`, `VEICULOS`, `FUNCIONARIOS` e `SERVICOS`)  

## Integrantes do Grupo
* Silvia Helena Vitoriano Silva
* Maria Thuane Sousa de Oliveira
* Josue Yrion Schindler da Silva Ramos
* Samuel Sousa de Oliveira
* Kauã Dos Anjos Barbosa

---

## Como preparar e executar o projeto

1. **Criar e popular o banco de dados:**
   Execute o arquivo `banco.sql` no MySQL Workbench para criar o schema `UpMec` e inserir os dados de teste.

2. **Instalar as dependências:**
   No terminal, dentro da pasta do projeto, execute:
   ```bash
   npm install
   ```

---

## Comandos de Execução do CRUD (`AGENDAMENTO`)

| Arquivo | Operação | Comando de Exemplo |
| :--- | :--- | :--- |
| `listar.js` | Read (Todos) | `node listar.js` |
| `buscar.js` | Read (Por ID) | `node buscar.js 1` |
| `inserir.js` | Create | `node inserir.js "15:00:00" "2026-11-18" "Pendente" "Revisao preventiva" 1 1 2 1` |
| `atualizar.js` | Update | `node atualizar.js 11 "Confirmado" "Cliente confirmou por WhatsApp"` |
| `excluir.js` | Delete | `node excluir.js 11` |

---

## Testes de Tratamento de Erro

* **Excluir registro usado em outra tabela (`ORCAMENTO` / `PAGAMENTO`):**
  ```bash
  node excluir.js 1
  ```
* **Inserir com chave estrangeira inexistente (ex.: cliente ID 99):**
  ```bash
  node inserir.js "15:00:00" "2026-11-18" "Pendente" "Teste erro" 99 1 2 1
  ```
* **Buscar registro inexistente:**
  ```bash
  node buscar.js 99
  ```
