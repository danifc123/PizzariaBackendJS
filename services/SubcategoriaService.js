const { Subcategoria } = require("../models");

class SubcategoriaService {
  async getAll() {
    return await Subcategoria.findAll();
  }

  async getById(id) {
    return await Subcategoria.findByPk(id);
  }

  async add(subcategoriaData) {
    return await Subcategoria.create(subcategoriaData);
  }

  async update(id, subcategoriaAtualizada) {
    const subcategoria = await Subcategoria.findByPk(id);
    if (!subcategoria) throw new Error("Subcategoria não encontrada");
    return await subcategoria.update(subcategoriaAtualizada);
  }

  async delete(id) {
    const subcategoria = await Subcategoria.findByPk(id);
    if (!subcategoria) throw new Error("Subcategoria não encontrada");
    return await subcategoria.destroy();
  }
}

module.exports = new SubcategoriaService();
