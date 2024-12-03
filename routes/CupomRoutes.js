const express = require("express");
const { getRepository } = require("typeorm");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cupomRepository = getRepository("Cupom");
    const cupons = await cupomRepository.find();
    res.json(cupons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cupons." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cupomRepository = getRepository("Cupom");
    const cupom = await cupomRepository.findOne(req.params.id);
    if (!cupom) {
      return res.status(404).json({ error: "Cupom não encontrado." });
    }
    res.json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o cupom." });
  }
});

router.post("/", async (req, res) => {
  try {
    const cupomRepository = getRepository("Cupom");
    const novoCupom = await cupomRepository.save(req.body);
    res.status(201).json(novoCupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar o cupom." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cupomRepository = getRepository("Cupom");
    const cupom = await cupomRepository.findOne(req.params.id);
    if (!cupom) {
      return res.status(404).json({ error: "Cupom não encontrado." });
    }
    await cupomRepository.update(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o cupom." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cupomRepository = getRepository("Cupom");
    const cupom = await cupomRepository.findOne(req.params.id);
    if (!cupom) {
      return res.status(404).json({ error: "Cupom não encontrado." });
    }
    await cupomRepository.remove(cupom);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o cupom." });
  }
});

module.exports = router;
