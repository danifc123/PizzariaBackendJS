const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource
const Subcategoria = require("../models/Subcategorias");
const Categoria = require("../models/Categoria"); // Corrija o caminho, se necessário

const getAllSubcategorias = async (req, res) => {
  try {
    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);
    const subcategorias = await subcategoriaRepository.find();
    res.status(200).json(subcategorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar subcategorias." });
  }
};

const getSubcategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);
    const subcategoria = await subcategoriaRepository.findOneBy({ id });
    if (!subcategoria) {
      return res.status(404).json({ error: "Subcategoria não encontrada." });
    }
    res.status(200).json(subcategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar subcategoria." });
  }
};
const addSubcategoria = async (req, res) => {
  const { nome, categoriaId } = req.body;

  if (!nome || !categoriaId) {
    return res
      .status(400)
      .json({ error: "Os campos 'nome' e 'categoriaId' são obrigatórios." });
  }

  try {
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    const categoria = await categoriaRepository.findOneBy({ id: categoriaId });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);
    const novaSubcategoria = subcategoriaRepository.create({
      nome,
      categoria, // Relacione a categoria diretamente
    });

    await subcategoriaRepository.save(novaSubcategoria);
    res.status(201).json(novaSubcategoria);
  } catch (error) {
    console.error("Erro ao adicionar subcategoria:", error);
    res.status(500).json({ error: "Erro ao adicionar subcategoria." });
  }
};

const updateSubcategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, categoriaId } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);
    const subcategoria = await subcategoriaRepository.findOne({
      where: { id },
    });

    if (!subcategoria) {
      return res.status(404).json({ error: "Subcategoria não encontrada." });
    }

    subcategoriaRepository.merge(subcategoria, { nome, categoriaId });
    await subcategoriaRepository.save(subcategoria);

    res.status(200).json(subcategoria);
  } catch (error) {
    console.error("Erro ao atualizar subcategoria:", error);
    res.status(500).json({ error: "Erro ao atualizar subcategoria." });
  }
};

const deleteSubcategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);
    const result = await subcategoriaRepository.delete({ id });
    if (result.affected === 0) {
      return res.status(404).json({ error: "Subcategoria não encontrada." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar subcategoria." });
  }
};

module.exports = {
  getAllSubcategorias,
  getSubcategoriaById,
  addSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
};
