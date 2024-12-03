const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Cupom",
  tableName: "cupons",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    codigo: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    desconto: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    validade: {
      type: "date",
      nullable: false,
    },
  },
});
