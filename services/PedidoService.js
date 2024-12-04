const { getRepository } = require("typeorm");
const Pedido = require("../entities/Pedido");

class PedidoService {
  async getAllPedidos() {
    const pedidoRepository = getRepository(Pedido);
    return await pedidoRepository.find();
  }

  async getPedidoById(id) {
    const pedidoRepository = getRepository(Pedido);
    return await pedidoRepository.findOne(id);
  }

  async addPedido(pedidoData) {
    const pedidoRepository = getRepository(Pedido);
    const novoPedido = pedidoRepository.create(pedidoData);
    return await pedidoRepository.save(novoPedido);
  }

  async updatePedido(id, pedidoAtualizado) {
    const pedidoRepository = getRepository(Pedido);
    const pedido = await pedidoRepository.findOne(id);
    if (!pedido) throw new Error("Pedido não encontrado");

    Object.assign(pedido, pedidoAtualizado);
    return await pedidoRepository.save(pedido);
  }

  async deletePedido(id) {
    const pedidoRepository = getRepository(Pedido);
    const pedido = await pedidoRepository.findOne(id);
    if (!pedido) throw new Error("Pedido não encontrado");

    return await pedidoRepository.remove(pedido);
  }

  async atualizarProdutoDoPedido(pedidoId, produtoAntigoId, produtoNovoId) {
    const pedidoRepository = getRepository(Pedido);
    const pedido = await pedidoRepository.findOne(pedidoId);
    if (!pedido) throw new Error("Pedido não encontrado");

    const produtos = pedido.produtos || [];
    const index = produtos.indexOf(produtoAntigoId);
    if (index === -1) throw new Error("Produto não encontrado no pedido");

    produtos[index] = produtoNovoId;
    pedido.produtos = produtos;
    return await pedidoRepository.save(pedido);
  }
}

module.exports = new PedidoService();
