const Category = require("../models/Categoria");
const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

const createCategory = async (req, res) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const { name, description, isActive } = req.body;

    const category = categoryRepository.create({ name, description, isActive });
    await categoryRepository.save(category);

    res.status(201).json(category);
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
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await categoryRepository.findOneBy({ id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    categoryRepository.merge(category, { name, description, isActive });
    await categoryRepository.save(category);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const { id } = req.params;

    const result = await categoryRepository.delete({ id });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
