const ConfiguracaoService = require("../models/Configuracoes");
const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource

const listarConfiguracoes = async (req, res) => {
  try {
    const configuracoesRepository =
      AppDataSource.getRepository(ConfiguracaoService);
    const configuracoes = await configuracoesRepository.find();
    res.status(200).json(configuracoes);
  } catch (error) {
    consolem.error("Erro ao buscar configurações:", error);
    res.status(500).json({ error: "Erro ao buscar configurações" });
  }
};
const buscarConfiguracaoPorId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }
  try {
    const configuracoesRepository =
      AppDataSource.getRepository(ConfiguracaoService);
    const configuracao = await configuracoesRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!configuracao) {
      return res.status(404).json({ error: "Configuração não encontrada." });
    }
    res.status(200).json(configuracao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar configuração." });
  }
};
const adicionarConfiguracao = async (req, res) => {
  const { nome, valor } = req.body;
  try {
    const configuracoesRepository =
      AppDataSource.getRepository(ConfiguracaoService); // Certifique-se de usar o nome correto da entidade
    const novaconfiguracao = configuracoesRepository.create({
      nome,
      valor,
    });
    await configuracoesRepository.save(novaconfiguracao);
    res.status(201).json(novaconfiguracao);
  } catch (error) {
    console.error("Erro ao adicionar configuração:", error); // Adicione log para depurar
    res.status(500).json({ error: "Erro ao adicionar configuração." });
  }
};

const atualizarConfiguracao = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const configuracaoRepository =
      AppDataSource.getRepository(ConfiguracaoService);
    const configuracao = await configuracaoRepository.findOne({
      where: { id },
    });

    if (!configuracao) {
      return res.status(404).json({ error: "Configuração não encontrada." });
    }

    configuracaoRepository.merge(configuracao, dadosAtualizados);
    await configuracaoRepository.save(configuracao);

    res.status(200).json(configuracao);
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error);
    res.status(500).json({ error: "Erro ao atualizar configuração." });
  }
};

const excluirConfiguracao = async (req, res) => {
  const { id } = req.params;
  console.log("Tentando excluir configuração com ID:", id);

  try {
    const configuracaoRepository =
      AppDataSource.getRepository(ConfiguracaoService);
    const configuracao = await configuracaoRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!configuracao) {
      console.log("Configuração não encontrada:", id);
      return res.status(404).json({ error: "Configuração não encontrada." });
    }

    await configuracaoRepository.remove(configuracao);
    console.log("Configuração excluída com sucesso:", id);
    res.status(200).json({ message: "Configuração excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir configuração:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir configuração.", details: error.message });
  }
};

module.exports = {
  listarConfiguracoes,
  buscarConfiguracaoPorId,
  adicionarConfiguracao,
  atualizarConfiguracao,
  excluirConfiguracao,
};
