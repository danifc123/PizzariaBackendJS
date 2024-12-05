const CupomService = require("../models/Cupom");
const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

const getAllCupons = async (req, res) => {
  try {
    const cupomRepository = AppDataSource.getRepository(CupomService);
    const cupons = await cupomRepository.find();
    res.status(200).json(cupons);
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    res.status(500).json({ error: "Erro ao buscar cupons." });
  }
};
const getCupomById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }
  try {
    const cupomRepository = AppDataSource.getRepository(CupomService);
    const cupom = await cupomRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!cupom) return res.status(404).json({ error: "Cupom não encontrado." });
    res.status(200).json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cupom." });
  }
};
const addCupom = async (req, res) => {
  const { codigo, desconto, validade } = req.body;
  try {
    const cupomRepository = AppDataSource.getRepository(CupomService);
    const novocupom = cupomRepository.create({ codigo, desconto, validade });
    await cupomRepository.save(novocupom);
    res.status(201).json(novocupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar cupom." });
  }
};

const updateCupom = async (req, res) => {
  try {
    const cupom = await CupomService.update(req.params.id, req.body);
    res.status(200).json(cupom);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cupom." });
  }
};

const deleteCupom = async (req, res) => {
  try {
    await CupomService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cupom." });
  }
};

module.exports = {
  getAllCupons,
  getCupomById,
  addCupom,
  updateCupom,
  deleteCupom,
};
