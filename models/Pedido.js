const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Pedido",
  tableName: "pedidos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    clienteId: {
      type: "int",
      nullable: false,
    },
    produtos: {
      type: "json",
      nullable: false,
    },
    total: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    dataPedido: {
      type: "date",
      nullable: false,
    },
  },
});
