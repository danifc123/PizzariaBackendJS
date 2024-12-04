const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

const Cliente = require("../models/Cliente");

const listarClientes = async (req, res) => {
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const clientes = await clienteRepository.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
};

const buscarClientePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente." });
  }
};

const adicionarCliente = async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const novoCliente = clienteRepository.create({
      nome,
      email,
      telefone,
      endereco,
    });
    await clienteRepository.save(novoCliente);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar cliente." });
  }
};

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    clienteRepository.merge(cliente, { nome, email, telefone, endereco });
    await clienteRepository.save(cliente);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente." });
  }
};

const excluirCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    await clienteRepository.remove(cliente);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente." });
  }
};

module.exports = {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  atualizarCliente,
  excluirCliente,
};
