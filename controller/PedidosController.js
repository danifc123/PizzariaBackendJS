const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource
const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");
const Cliente = require("../models/Cliente");

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
    const produtoRepository = AppDataSource.getRepository(Produto);
    const clienteRepository = AppDataSource.getRepository(Cliente);

    const { clienteId, produtos, total, dataPedido } = req.body;

    // Garantir que clienteId seja um número
    if (isNaN(clienteId)) {
      return res.status(400).json({ error: "clienteId deve ser um número." });
    }

    // Verificando se o cliente existe
    const cliente = await clienteRepository.findOneBy({ id: clienteId });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // Verificando se os produtos são IDs válidos
    const idsProdutos = produtos.map((produto) => parseInt(produto, 10));

    // Certifique-se de que todos os itens em 'produtos' são números válidos
    if (idsProdutos.some((id) => isNaN(id))) {
      return res.status(400).json({
        error: "Todos os produtos devem ser identificados por IDs válidos.",
      });
    }

    // Buscando os produtos pelo ID
    const produtosExistentes = await produtoRepository.findByIds(idsProdutos);

    if (produtosExistentes.length !== produtos.length) {
      return res
        .status(404)
        .json({ error: "Alguns produtos não foram encontrados." });
    }

    // Criando o novo pedido
    const novoPedido = pedidoRepository.create({
      clienteId,
      produtos: produtosExistentes, // Associando os produtos encontrados
      total,
      dataPedido,
    });

    // Salvando o pedido
    await pedidoRepository.save(novoPedido);

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error("Erro ao adicionar pedido:", error);
    res.status(500).json({ error: "Erro ao adicionar pedido." });
  }
};

const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { clienteId, produtos, total, dataPedido } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const pedido = await pedidoRepository.findOne({ where: { id } });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    pedidoRepository.merge(pedido, { clienteId, produtos, total, dataPedido });
    await pedidoRepository.save(pedido);

    res.status(200).json(pedido);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
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
