const express = require("express");
const router = express.Router();
const { Subcategoria } = require("../models");

// Obter todas as subcategorias
router.get("/", async (req, res) => {
  try {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar subcategorias." });
  }
});

// Adicionar uma nova subcategoria
router.post("/", async (req, res) => {
  try {
    const subcategoria = await Subcategoria.create(req.body);
    res.status(201).json(subcategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar subcategoria." });
  }
});

// Buscar subcategoria por ID
router.get("/:id", async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByPk(req.params.id);
    if (!subcategoria)
      return res.status(404).json({ error: "Subcategoria não encontrada." });
    res.json(subcategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar subcategoria." });
  }
});

// Atualizar uma subcategoria
router.put("/:id", async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByPk(req.params.id);
    if (!subcategoria)
      return res.status(404).json({ error: "Subcategoria não encontrada." });

    await subcategoria.update(req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar subcategoria." });
  }
});

// Deletar uma subcategoria
router.delete("/:id", async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByPk(req.params.id);
    if (!subcategoria)
      return res.status(404).json({ error: "Subcategoria não encontrada." });

    await subcategoria.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar subcategoria." });
  }
});

module.exports = router;
