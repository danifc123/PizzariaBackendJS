const express = require("express");
const router = express.Router();
const CupomService = require("../services/CupomService");

// Obter todos os cupons
router.get("/", async (req, res) => {
  try {
    const cupons = await CupomService.getAll();
    res.json(cupons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cupons." });
  }
});

// Obter um cupom pelo ID
router.get("/:id", async (req, res) => {
  try {
    const cupom = await CupomService.getById(req.params.id);
    if (!cupom) return res.status(404).json({ error: "Cupom não encontrado." });
    res.json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cupom." });
  }
});

// Adicionar um novo cupom
router.post("/", async (req, res) => {
  try {
    const cupom = await CupomService.add(req.body);
    res.status(201).json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar cupom." });
  }
});

// Atualizar um cupom
router.put("/:id", async (req, res) => {
  try {
    const cupom = await CupomService.update(req.params.id, req.body);
    res.status(200).json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cupom." });
  }
});

// Deletar um cupom
router.delete("/:id", async (req, res) => {
  try {
    await CupomService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cupom." });
  }
});

module.exports = router;
