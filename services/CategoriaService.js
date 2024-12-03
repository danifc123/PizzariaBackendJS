const Categoria = require("../models/Categoria");

class CategoriaService {
  // Busca todas as categorias
  async getAllCategorias() {
    try {
      return await Categoria.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar categorias.");
    }
  }

  // Busca uma categoria por ID
  async getCategoriaById(id) {
    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada.");
      }
      return categoria;
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar categoria.");
    }
  }

  // Adiciona uma nova categoria
  async addCategoria(categoriaData) {
    try {
      const novaCategoria = await Categoria.create(categoriaData);
      return novaCategoria;
    } catch (error) {
      throw new Error("Erro ao adicionar categoria.");
    }
  }

  // Atualiza uma categoria existente
  async updateCategoria(id, categoriaData) {
    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada.");
      }
      return await categoria.update(categoriaData);
    } catch (error) {
      throw new Error("Erro ao atualizar categoria.");
    }
  }

  // Remove uma categoria
  async deleteCategoria(id) {
    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada.");
      }
      await categoria.destroy();
    } catch (error) {
      throw new Error("Erro ao excluir categoria.");
    }
  }
}

module.exports = new CategoriaService();
