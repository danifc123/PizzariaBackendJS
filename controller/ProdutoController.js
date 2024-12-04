const { AppDataSource } = require("../config/data-source");
const Produto = require("../models/Produto");

const getAllProdutos = async (req, res) => {
  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produtos = await produtoRepository.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produto = await produtoRepository.findOneBy({ id });
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

const addProduto = async (req, res) => {
  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const { nome, preco, descricao, subcategoriaId } = req.body;

    const novoProduto = produtoRepository.create({
      nome,
      preco,
      descricao,
      subcategoriaId,
    });
    await produtoRepository.save(novoProduto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto." });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, subcategoriaId } = req.body;
  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produto = await produtoRepository.findOneBy({ id });
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    produtoRepository.merge(produto, {
      nome,
      preco,
      descricao,
      subcategoriaId,
    });
    await produtoRepository.save(produto);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const result = await produtoRepository.delete({ id });
    if (result.affected === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir produto." });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  addProduto,
  updateProduto,
  deleteProduto,
};
