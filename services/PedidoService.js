const { Pedido } = require("../models");

class PedidoService {
  async getAllPedidos() {
    return await Pedido.findAll();
  }

  async getPedidoById(id) {
    return await Pedido.findByPk(id);
  }

  async addPedido(pedidoData) {
    return await Pedido.create(pedidoData);
  }

  async updatePedido(id, pedidoAtualizado) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido não encontrado");
    return await pedido.update(pedidoAtualizado);
  }

  async deletePedido(id) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido não encontrado");
    return await pedido.destroy();
  }

  async atualizarProdutoDoPedido(pedidoId, produtoAntigoId, produtoNovoId) {
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) throw new Error("Pedido não encontrado");

    const produtos = pedido.produtos || [];
    const index = produtos.indexOf(produtoAntigoId);
    if (index === -1) throw new Error("Produto não encontrado no pedido");

    produtos[index] = produtoNovoId;
    return await pedido.update({ produtos });
  }
}

module.exports = new PedidoService();
