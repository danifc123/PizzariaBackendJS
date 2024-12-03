const { getRepository } = require("typeorm");
const Configuracao = require("../entities/Configuracao");

class ConfiguracaoService {
  async listarConfiguracoes() {
    const configuracaoRepository = getRepository(Configuracao);
    return await configuracaoRepository.find();
  }

  async buscarPorNome(nome) {
    const configuracaoRepository = getRepository(Configuracao);
    return await configuracaoRepository.findOne({ where: { nome } });
  }

  async adicionarConfiguracao(configuracaoData) {
    const configuracaoRepository = getRepository(Configuracao);
    const novaConfiguracao = configuracaoRepository.create(configuracaoData);
    return await configuracaoRepository.save(novaConfiguracao);
  }

  async atualizarConfiguracao(id, configuracaoAtualizada) {
    const configuracaoRepository = getRepository(Configuracao);
    const configuracao = await configuracaoRepository.findOne(id);
    if (!configuracao) throw new Error("Configuração não encontrada");
    configuracaoRepository.merge(configuracao, configuracaoAtualizada);
    return await configuracaoRepository.save(configuracao);
  }

  async removerConfiguracao(id) {
    const configuracaoRepository = getRepository(Configuracao);
    const configuracao = await configuracaoRepository.findOne(id);
    if (!configuracao) throw new Error("Configuração não encontrada");
    return await configuracaoRepository.remove(configuracao);
  }
}

module.exports = new ConfiguracaoService();
