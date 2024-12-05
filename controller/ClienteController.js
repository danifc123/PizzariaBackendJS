const AppDataSource = require("../config/data-source"); // Importar corretamente AppDataSource
const Cliente = require("../models/Cliente");

const listarClientes = async (req, res) => {
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const clientes = await clienteRepository.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
};

const buscarClientePorId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).json({ error: "Erro ao buscar cliente." });
  }
};

const adicionarCliente = async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const novoCliente = clienteRepository.create({
      nome,
      email,
      telefone,
      endereco,
    });
    await clienteRepository.save(novoCliente);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar cliente." });
  }
};

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;

  // Verifica se o ID foi fornecido
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  // Verifica se todos os campos necessários estão presentes
  if (!nome || !email || !telefone || !endereco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    
    // Verifica se o cliente existe
    const cliente = await clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // Atualiza o cliente
    clienteRepository.merge(cliente, { nome, email, telefone, endereco });
    await clienteRepository.save(cliente);

    // Retorna os dados atualizados
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error); // Log do erro para depuração
    res.status(500).json({ error: "Erro ao atualizar cliente.", details: error.message }); // Mostra o erro detalhado na resposta
  }
};



const excluirCliente = async (req, res) => {
  const { id } = req.params;
  console.log('Tentando excluir cliente com ID:', id); // Log para verificar ID

  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!cliente) {
      console.log('Cliente não encontrado:', id); // Log se cliente não for encontrado
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    
    await clienteRepository.remove(cliente);
    console.log('Cliente excluído com sucesso:', id); // Log de sucesso
    res.status(200).json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ error: "Erro ao excluir cliente.", details: error.message });
  }
};



module.exports = {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  atualizarCliente,
  excluirCliente,
};
