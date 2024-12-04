const { getRepository } = require("typeorm");
const Produto = require("../models/Produto");

class ProdutoService {
  // Buscar todos os produtos
  async getAllProdutos() {
    const produtoRepository = getRepository(Produto);
    return await produtoRepository.find();
  }

  // Buscar produto por ID
  async getProdutoById(id) {
    const produtoRepository = getRepository(Produto);
    const produto = await produtoRepository.findOne(id);
    if (!produto) throw new Error("Produto não encontrado");
    return produto;
  }

  // Adicionar produto
  async addProduto(produtoData) {
    const produtoRepository = getRepository(Produto);
    const novoProduto = produtoRepository.create(produtoData);
    return await produtoRepository.save(novoProduto);
  }

  // Atualizar produto
  async updateProduto(id, produtoAtualizado) {
    const produtoRepository = getRepository(Produto);
    const produto = await produtoRepository.findOne(id);
    if (!produto) throw new Error("Produto não encontrado");

    Object.assign(produto, produtoAtualizado);
    return await produtoRepository.save(produto);
  }

  // Deletar produto
  async deleteProduto(id) {
    const produtoRepository = getRepository(Produto);
    const produto = await produtoRepository.findOne(id);
    if (!produto) throw new Error("Produto não encontrado");
    return await produtoRepository.remove(produto);
  }
}

module.exports = new ProdutoService();
