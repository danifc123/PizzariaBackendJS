const { Cliente } = require("../models");

class ClienteService {
  async getAllClientes() {
    return await Cliente.findAll();
  }

  async getClienteById(id) {
    return await Cliente.findByPk(id);
  }

  async addCliente(clienteData) {
    return await Cliente.create(clienteData);
  }

  async updateCliente(id, clienteData) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return await cliente.update(clienteData);
  }

  async deleteCliente(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return await cliente.destroy();
  }
}

module.exports = new ClienteService();
