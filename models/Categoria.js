const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
  },
});
