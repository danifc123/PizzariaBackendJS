const Category = require("../models/Categoria");
const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

const createCategory = async (req, res) => {
  const { nome } = req.body;
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const novaCategoria = categoryRepository.create({
      nome,
    });
    await categoryRepository.save(novaCategoria);
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    categoryRepository.merge(category, { name, description, isActive });
    await categoryRepository.save(category);

    res.status(200).json(category);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    res.status(500).json({ error: "Erro ao atualizar categoria." });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  console.log("Tentando excluir categoria com ID:", id);

  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categoria = await categoryRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!categoria) {
      console.log("Categoria não encontrada:", id);
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    await categoryRepository.remove(categoria);
    console.log("Categoria excluída com sucesso:", id);
    res.status(200).json({ message: "Categoria excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir categoria.", details: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
