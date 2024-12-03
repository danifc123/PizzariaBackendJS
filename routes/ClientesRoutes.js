const express = require("express");
const ClienteController = require("../controllers/ClienteController");

const router = express.Router();

router.get("/", ClienteController.listarClientes);
router.get("/:id", ClienteController.buscarClientePorId);
router.post("/", ClienteController.adicionarCliente);
router.put("/:id", ClienteController.atualizarCliente);
router.delete("/:id", ClienteController.excluirCliente);

module.exports = router;
