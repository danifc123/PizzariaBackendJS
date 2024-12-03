const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Cliente",
  tableName: "clientes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nome: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    telefone: {
      type: "varchar",
      nullable: false,
    },
    endereco: {
      type: "varchar",
      nullable: false,
    },
  },
});
