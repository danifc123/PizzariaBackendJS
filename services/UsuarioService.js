const { Usuario } = require("../models");

class UsuarioService {
  async getUsuarios() {
    return await Usuario.findAll();
  }

  async getUsuarioById(id) {
    return await Usuario.findByPk(id);
  }

  async addUsuario(usuarioData) {
    return await Usuario.create(usuarioData);
  }

  async updateUsuario(id, usuarioAtualizado) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return await usuario.update(usuarioAtualizado);
  }

  async deleteUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return await usuario.destroy();
  }
}

module.exports = new UsuarioService();
