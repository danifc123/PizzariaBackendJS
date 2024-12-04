const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Produto",
  tableName: "produtos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nome: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    preco: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    descricao: {
      type: "text",
      nullable: true,
    },
    subcategoriaId: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    subcategoria: {
      target: "Subcategoria",
      type: "many-to-one",
      joinColumn: { name: "subcategoriaId" },
    },
  },
});
