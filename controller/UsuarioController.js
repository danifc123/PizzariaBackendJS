const UsuarioService = require("../models/Usuario");
const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

// Obter todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioService);
    const usuarios = await usuarioRepository.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

const adicionarUsuario = async (req, res) => {
  const { nome, email, senha, regra } = req.body;
  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioService);
    const novoUsuario = usuarioRepository.create({
      nome,
      email,
      senha,
      regra,
    });
    await usuarioRepository.save(novoUsuario);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar usuário." });
  }
};

// Buscar usuário por ID
const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const usuariosRepository = AppDataSource.getRepository(UsuarioService);
    const usuario = await usuariosRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado." });
  }
};

// Atualizar um usuário
const atualizarUsuario = async (req, res) => {
  try {
    await UsuarioService.updateUsuario(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado." });
  }
};

// Deletar um usuário
const excluirUsuario = async (req, res) => {
  try {
    await UsuarioService.deleteUsuario(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado." });
  }
};

module.exports = {
  listarUsuarios,
  adicionarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
};
