const ConfiguracaoService = require("../services/ConfiguracaoService");

module.exports = {
  async listarConfiguracoes(req, res) {
    try {
      const configuracoes = await ConfiguracaoService.listarConfiguracoes();
      res.json(configuracoes);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar configurações." });
    }
  },

  async buscarConfiguracaoPorId(req, res) {
    try {
      const configuracao = await ConfiguracaoService.buscarPorNome(
        req.params.id
      );
      if (!configuracao) {
        return res.status(404).json({ error: "Configuração não encontrada." });
      }
      res.json(configuracao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar configuração." });
    }
  },

  async adicionarConfiguracao(req, res) {
    try {
      const configuracao = await ConfiguracaoService.adicionarConfiguracao(
        req.body
      );
      res.status(201).json(configuracao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar configuração." });
    }
  },

  async atualizarConfiguracao(req, res) {
    try {
      await ConfiguracaoService.atualizarConfiguracao(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar configuração." });
    }
  },

  async excluirConfiguracao(req, res) {
    try {
      await ConfiguracaoService.removerConfiguracao(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar configuração." });
    }
  },
};
