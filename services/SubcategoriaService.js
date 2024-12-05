const { getRepository } = require("typeorm");
const Subcategoria = require("../models/Subcategorias");
const Categoria = require("../models/Categoria");

class SubcategoriaService {
  // Buscar todas as subcategorias
  async getAll() {
    const subcategoriaRepository = getRepository(Subcategoria);
    return await subcategoriaRepository.find();
  }

  // Buscar subcategoria por ID
  async getById(id) {
    const subcategoriaRepository = getRepository(Subcategoria);
    const subcategoria = await subcategoriaRepository.findOne(id);
    if (!subcategoria) throw new Error("Subcategoria não encontrada");
    return subcategoria;
  }

  // Adicionar nova subcategoria
  async add(subcategoriaData) {
    const { nome, categoriaId } = subcategoriaData;
    const categoriaRepository = getRepository(Categoria);

    // Valida a categoria antes de criar a subcategoria
    const categoria = await categoriaRepository.findOne(categoriaId);
    if (!categoria) throw new Error("Categoria não encontrada");

    const subcategoriaRepository = getRepository(Subcategoria);
    const novaSubcategoria = subcategoriaRepository.create({
      nome,
      categoria, // Relaciona a categoria diretamente
    });

    return await subcategoriaRepository.save(novaSubcategoria);
  }

  // Atualizar subcategoria existente
  async update(id, subcategoriaAtualizada) {
    const subcategoriaRepository = getRepository(Subcategoria);
    const subcategoria = await subcategoriaRepository.findOne(id);
    if (!subcategoria) throw new Error("Subcategoria não encontrada");

    Object.assign(subcategoria, subcategoriaAtualizada);
    return await subcategoriaRepository.save(subcategoria);
  }

  // Deletar subcategoria
  async delete(id) {
    const subcategoriaRepository = getRepository(Subcategoria);
    const subcategoria = await subcategoriaRepository.findOne(id);
    if (!subcategoria) throw new Error("Subcategoria não encontrada");

    return await subcategoriaRepository.remove(subcategoria);
  }
}

module.exports = new SubcategoriaService();
