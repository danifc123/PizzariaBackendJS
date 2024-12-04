const { getRepository } = require("typeorm");
const Categoria = require("../models/Categoria");

class CategoriaService {
  // Busca todas as categorias
  async getAllCategorias() {
    const categoriaRepository = getRepository(Categoria);
    return await categoriaRepository.find();
  }

  // Busca uma categoria por ID
  async getCategoriaById(id) {
    const categoriaRepository = getRepository(Categoria);
    const categoria = await categoriaRepository.findOne(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada.");
    }
    return categoria;
  }

  // Adiciona uma nova categoria
  async addCategoria(categoriaData) {
    const categoriaRepository = getRepository(Categoria);
    const novaCategoria = categoriaRepository.create(categoriaData);
    return await categoriaRepository.save(novaCategoria);
  }

  // Atualiza uma categoria existente
  async updateCategoria(id, categoriaData) {
    const categoriaRepository = getRepository(Categoria);
    const categoria = await categoriaRepository.findOne(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada.");
    }
    Object.assign(categoria, categoriaData);
    return await categoriaRepository.save(categoria);
  }

  // Remove uma categoria
  async deleteCategoria(id) {
    const categoriaRepository = getRepository(Categoria);
    const categoria = await categoriaRepository.findOne(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada.");
    }
    return await categoriaRepository.remove(categoria);
  }
}

module.exports = new CategoriaService();
