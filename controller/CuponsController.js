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
  try {
    const cupom = await CupomService.getById(req.params.id);
    if (!cupom) return res.status(404).json({ error: "Cupom não encontrado." });
    res.status(200).json(cupons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cupom." });
  }
};

const addCupom = async (req, res) => {
  try {
    const cupom = await CupomService.add(req.body);
    res.status(201).json(cupom);
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
