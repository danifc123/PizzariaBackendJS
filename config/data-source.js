const { Client } = require("pg");
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "fariadocarmo123",
  database: "pizzaria",
  synchronize: true, // Para criar tabelas automaticamente com base nas entidades
  logging: false,
  entities: [Cliente], // Diretório onde estão as entidades
  migrations: [], // Diretório para migrações
  subscribers: [],
});

module.exports = AppDataSource;
