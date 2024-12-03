const express = require("express");
const Pedido = require("../models/Pedido");
const router = express.Router();

// GET: Buscar todos os pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
});

// GET: Buscar pedido por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
});

// POST: Criar novo pedido
router.post("/", async (req, res) => {
  const { clienteId, dataPedido, total } = req.body;
  try {
    const novoPedido = await Pedido.create({ clienteId, dataPedido, total });
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
});

// PUT: Atualizar pedido
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { clienteId, dataPedido, total } = req.body;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    pedido.clienteId = clienteId;
    pedido.dataPedido = dataPedido;
    pedido.total = total;
    await pedido.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
});

// DELETE: Excluir pedido
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    await pedido.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pedido." });
  }
});

module.exports = router;
