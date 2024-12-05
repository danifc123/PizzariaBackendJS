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
  const { id } = req.params;
  const dadosAtualizados = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioService);
    const usuario = await usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    usuarioRepository.merge(usuario, dadosAtualizados);
    await usuarioRepository.save(usuario);

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// Deletar um usuário
const excluirUsuario = async (req, res) => {
  const { id } = req.params;
  console.log("Tentando excluir usuário com ID:", id);

  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioService);
    const usuario = await usuarioRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!usuario) {
      console.log("Usuário não encontrado:", id);
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await usuarioRepository.remove(usuario);
    console.log("Usuário excluído com sucesso:", id);
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir usuário.", details: error.message });
  }
};
module.exports = {
  listarUsuarios,
  adicionarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
};
