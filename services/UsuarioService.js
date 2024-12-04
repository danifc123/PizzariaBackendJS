const { getRepository } = require("typeorm");
const Usuario = require("../models/Usuario");

class UsuarioService {
  // Buscar todos os usuários
  async getUsuarios() {
    const usuarioRepository = getRepository(Usuario);
    return await usuarioRepository.find();
  }

  // Buscar usuário por ID
  async getUsuarioById(id) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return usuario;
  }

  // Adicionar usuário
  async addUsuario(usuarioData) {
    const usuarioRepository = getRepository(Usuario);
    const novoUsuario = usuarioRepository.create(usuarioData);
    return await usuarioRepository.save(novoUsuario);
  }

  // Atualizar usuário
  async updateUsuario(id, usuarioAtualizado) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    Object.assign(usuario, usuarioAtualizado);
    return await usuarioRepository.save(usuario);
  }

  // Deletar usuário
  async deleteUsuario(id) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return await usuarioRepository.remove(usuario);
  }
}

module.exports = new UsuarioService();
