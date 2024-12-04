const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Usuario",
  tableName: "usuarios",
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
    senha: {
      type: "varchar",
      nullable: false,
    },
    regra: {
      type: "varchar",
      nullable: false,
    },
  },
});
