const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Categoria",
  tableName: "categorias",
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
  },
  relations: {
    subcategorias: {
      type: "one-to-many",
      target: "Subcategoria",
      inverseSide: "categoria",
      cascade: true,
    },
  },
});
