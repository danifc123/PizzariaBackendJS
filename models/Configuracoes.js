const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Configuracao",
  tableName: "configuracoes",
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
    valor: {
      type: "varchar",
      nullable: false,
    },
  },
});
