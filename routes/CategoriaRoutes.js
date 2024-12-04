const express = require("express");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoriaController");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
