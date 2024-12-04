const { getRepository } = require("typeorm");
const Cliente = require("../models/Cliente");

class ClienteService {
  // Buscar todos os clientes
  async getAllClientes() {
    const clienteRepository = getRepository(Cliente);
    return await clienteRepository.find();
  }

  // Buscar cliente por ID
  async getClienteById(id) {
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return cliente;
  }

  // Adicionar cliente
  async addCliente(clienteData) {
    const clienteRepository = getRepository(Cliente);
    const novoCliente = clienteRepository.create(clienteData);
    return await clienteRepository.save(novoCliente);
  }

  // Atualizar cliente
  async updateCliente(id, clienteData) {
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) throw new Error("Cliente não encontrado");

    Object.assign(cliente, clienteData);
    return await clienteRepository.save(cliente);
  }

  // Deletar cliente
  async deleteCliente(id) {
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.findOne(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return await clienteRepository.remove(cliente);
  }
}

module.exports = new ClienteService();
