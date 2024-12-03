const express = require("express");
const Produto = require("../models/Produto");
const router = express.Router();

// GET: Buscar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// GET: Buscar produto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

// POST: Adicionar produto
router.post("/", async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto." });
  }
});

// PUT: Atualizar produto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    produto.nome = nome;
    produto.preco = preco;
    await produto.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
});

// DELETE: Excluir produto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    await produto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir produto." });
  }
});

module.exports = router;
