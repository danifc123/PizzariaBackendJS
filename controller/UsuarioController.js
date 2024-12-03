const express = require("express");
const router = express.Router();
const { Usuario } = require("../models");

// Obter todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Adicionar um novo usuário
router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar usuário." });
  }
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado." });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// Atualizar um usuário
router.put("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado." });

    await usuario.update(req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// Deletar um usuário
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado." });

    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

module.exports = router;
