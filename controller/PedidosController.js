const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource
const Pedido = require("../models/Pedido");

const getAllPedidos = async (req, res) => {
  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const pedidos = await pedidoRepository.find();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

const getPedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const pedido = await pedidoRepository.findOneBy({ id });
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

const addPedido = async (req, res) => {
  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const { clienteId, produtos, total, dataPedido } = req.body;

    const novoPedido = pedidoRepository.create({
      clienteId,
      produtos,
      total,
      dataPedido,
    });
    await pedidoRepository.save(novoPedido);
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar pedido." });
  }
};

const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { clienteId, produtos, total, dataPedido } = req.body;
  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const pedido = await pedidoRepository.findOneBy({ id });
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    pedidoRepository.merge(pedido, { clienteId, produtos, total, dataPedido });
    await pedidoRepository.save(pedido);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};

const deletePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const result = await pedidoRepository.delete({ id });
    if (result.affected === 0) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pedido." });
  }
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  addPedido,
  updatePedido,
  deletePedido,
};
