const express = require("express");
const {
  getAllUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controller/UsuarioController");

const router = express.Router();

router.get("/", getAllUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", addUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;
