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
  const { id } = req.params;
  const dadosAtualizados = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const cupomRepository = AppDataSource.getRepository(CupomService);
    const cupom = await cupomRepository.findOne({ where: { id } });

    if (!cupom) {
      return res.status(404).json({ error: "Cupom não encontrado." });
    }

    cupomRepository.merge(cupom, dadosAtualizados);
    await cupomRepository.save(cupom);

    res.status(200).json(cupom);
  } catch (error) {
    console.error("Erro ao atualizar cupom:", error);
    res.status(500).json({ error: "Erro ao atualizar cupom." });
  }
};

const deleteCupom = async (req, res) => {
  const { id } = req.params;
  console.log("Tentando excluir cupom com ID:", id);

  try {
    const cupomRepository = AppDataSource.getRepository(CupomService);
    const cupom = await cupomRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!cupom) {
      console.log("Cupom não encontrado:", id);
      return res.status(404).json({ error: "Cupom não encontrado." });
    }

    await cupomRepository.remove(cupom);
    console.log("Cupom excluído com sucesso:", id);
    res.status(200).json({ message: "Cupom excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir cupom:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir cupom.", details: error.message });
  }
};

module.exports = {
  getAllCupons,
  getCupomById,
  addCupom,
  updateCupom,
  deleteCupom,
};
