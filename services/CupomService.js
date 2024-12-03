const AppDataSource = require("../config/data-source");
const Cupom = require("../entities/Cupom");

class CupomService {
  async getAll() {
    const cupomRepository = AppDataSource.getRepository(Cupom);
    return await cupomRepository.find();
  }

  async getById(id) {
    const cupomRepository = AppDataSource.getRepository(Cupom);
    return await cupomRepository.findOneBy({ id });
  }

  async add(cupomData) {
    const cupomRepository = AppDataSource.getRepository(Cupom);
    const newCupom = cupomRepository.create(cupomData);
    return await cupomRepository.save(newCupom);
  }

  async update(id, cupomAtualizado) {
    const cupomRepository = AppDataSource.getRepository(Cupom);
    const cupom = await cupomRepository.findOneBy({ id });
    if (!cupom) throw new Error("Cupom não encontrado");

    Object.assign(cupom, cupomAtualizado);
    return await cupomRepository.save(cupom);
  }

  async delete(id) {
    const cupomRepository = AppDataSource.getRepository(Cupom);
    const cupom = await cupomRepository.findOneBy({ id });
    if (!cupom) throw new Error("Cupom não encontrado");

    return await cupomRepository.remove(cupom);
  }
}

module.exports = new CupomService();
