const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Subcategoria",
  tableName: "subcategorias",
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
    categoria: {
      type: "many-to-one",
      target: "Categoria",
      joinColumn: true,
      onDelete: "CASCADE", // Deleta subcategorias se a categoria for excluída
      nullable: false,
    },
  },
});
