const { DataSource } = require("typeorm");
const Categoria = require("../models/Categoria");
const Subcategorias = require("../models/Subcategorias");
const Cliente = require("../models/Cliente");
const Configuracao = require("../models/Configuracoes");
const Cupom = require("../models/Cupom");
const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");
const Usuario = require("../models/Usuario");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "fariadocarmo123",
  database: "pizzariabackendjs",
  synchronize: false,
  logging: false,
  entities: [
    Categoria,
    Subcategorias,
    Cliente,
    Configuracao,
    Cupom,
    Pedido,
    Produto,
    Usuario,
  ],
  migrations: ["migrations/*.js"], // Certifique-se de que as migrações estão em JS
  subscribers: [],
});

module.exports = AppDataSource;
