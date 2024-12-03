const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Clientes", // Nome da tabela relacionada
      key: "id",
    },
  },
  produtos: {
    type: DataTypes.JSON, // Armazena lista de IDs de produtos
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dataPedido: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Pedido;
