const express = require("express");
const ConfiguracaoController = require("../controller/ConfiguracoesController");

const router = express.Router();

router.get("/", ConfiguracaoController.listarConfiguracoes);
router.get("/:id", ConfiguracaoController.buscarConfiguracaoPorId);
router.post("/", ConfiguracaoController.adicionarConfiguracao);
router.put("/:id", ConfiguracaoController.atualizarConfiguracao);
router.delete("/:id", ConfiguracaoController.excluirConfiguracao);

module.exports = router;
