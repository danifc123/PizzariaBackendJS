const { getRepository } = require("typeorm");
const Cliente = require("../entities/Cliente");

module.exports = {
  // GET: Buscar todos os clientes
  listarClientes: async (req, res) => {
    try {
      const clienteRepository = getRepository(Cliente);
      const clientes = await clienteRepository.find();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar clientes." });
    }
  },

  // GET: Buscar cliente por ID
  buscarClientePorId: async (req, res) => {
    const { id } = req.params;
    try {
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.findOne(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar cliente." });
    }
  },

  // POST: Adicionar cliente
  adicionarCliente: async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    try {
      const clienteRepository = getRepository(Cliente);
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
  },

  // PUT: Atualizar cliente
  atualizarCliente: async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    try {
      const clienteRepository = getRepository(Cliente);
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
  },

  // DELETE: Excluir cliente
  excluirCliente: async (req, res) => {
    const { id } = req.params;
    try {
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.findOne(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }
      await clienteRepository.remove(cliente);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir cliente." });
    }
  },
};
