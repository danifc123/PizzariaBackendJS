const express = require("express");
const {
  getAllPedidos,
  getPedidoById,
  addPedido,
  updatePedido,
  deletePedido,
} = require("../controller/PedidoController");

const router = express.Router();

router.get("/", getAllPedidos);
router.get("/:id", getPedidoById);
router.post("/", addPedido);
router.put("/:id", updatePedido);
router.delete("/:id", deletePedido);

module.exports = router;
