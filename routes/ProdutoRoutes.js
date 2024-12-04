const express = require("express");
const {
  getAllProdutos,
  getProdutoById,
  addProduto,
  updateProduto,
  deleteProduto,
} = require("../controller/ProdutoController");

const router = express.Router();

router.get("/", getAllProdutos);
router.get("/:id", getProdutoById);
router.post("/", addProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);

module.exports = router;
