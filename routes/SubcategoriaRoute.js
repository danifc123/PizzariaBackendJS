const express = require("express");
const {
  getAllSubcategorias,
  getSubcategoriaById,
  addSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
} = require("../controller/SubcategoriaController");

const router = express.Router();

router.get("/", getAllSubcategorias);
router.get("/:id", getSubcategoriaById);
router.post("/", addSubcategoria);
router.put("/:id", updateSubcategoria);
router.delete("/:id", deleteSubcategoria);

module.exports = router;
