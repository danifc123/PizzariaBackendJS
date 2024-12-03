const { Produto } = require("../models");

class ProdutoService {
  async getAllProdutos() {
    return await Produto.findAll();
  }

  async getProdutoById(id) {
    return await Produto.findByPk(id);
  }

  async addProduto(produtoData) {
    return await Produto.create(produtoData);
  }

  async updateProduto(id, produtoAtualizado) {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error("Produto não encontrado");
    return await produto.update(produtoAtualizado);
  }

  async deleteProduto(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error("Produto não encontrado");
    return await produto.destroy();
  }
}

module.exports = new ProdutoService();
