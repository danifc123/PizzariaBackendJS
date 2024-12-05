const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource
const Produto = require("../models/Produto");
const Subcategoria = require("../models/Subcategorias");
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
  const { nome, preco, descricao, subcategoriaId } = req.body;

  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const subcategoriaRepository = AppDataSource.getRepository(Subcategoria);

    // Verifica se a subcategoria existe
    const subcategoria = await subcategoriaRepository.findOneBy({
      id: subcategoriaId,
    });

    if (!subcategoria) {
      return res.status(404).json({ error: "Subcategoria não encontrada." });
    }

    // Cria o produto e associa a subcategoria
    const novoProduto = produtoRepository.create({
      nome,
      preco,
      descricao,
      subcategoria, // Relaciona diretamente com a entidade Subcategoria
    });

    // Salva o produto
    await produtoRepository.save(novoProduto);

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error); // Exibe detalhes no console
    res.status(500).json({ error: "Erro ao adicionar produto." });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, subcategoriaId } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produto = await produtoRepository.findOne({ where: { id } });

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
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  console.log("Tentando excluir produto com ID:", id);

  try {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produto = await produtoRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!produto) {
      console.log("Produto não encontrado:", id);
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await produtoRepository.remove(produto);
    console.log("Produto excluído com sucesso:", id);
    res.status(200).json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir produto.", details: error.message });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  addProduto,
  updateProduto,
  deleteProduto,
};
