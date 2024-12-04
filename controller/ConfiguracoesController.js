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
  try {
    const configuracao = await ConfiguracaoService.buscarPorNome(req.params.id);
    if (!configuracao) {
      return res.status(404).json({ error: "Configuração não encontrada." });
    }
    res.status(200).json(configuracoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar configuração." });
  }
};

const adicionarConfiguracao = async (req, res) => {
  try {
    const configuracao = await ConfiguracaoService.adicionarConfiguracao(
      req.body
    );
    res.status(201).json(configuracao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar configuração." });
  }
};

const atualizarConfiguracao = async (req, res) => {
  try {
    await ConfiguracaoService.atualizarConfiguracao(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar configuração." });
  }
};

const excluirConfiguracao = async (req, res) => {
  try {
    await ConfiguracaoService.removerConfiguracao(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar configuração." });
  }
};

module.exports = {
  listarConfiguracoes,
  buscarConfiguracaoPorId,
  adicionarConfiguracao,
  atualizarConfiguracao,
  excluirConfiguracao,
};
