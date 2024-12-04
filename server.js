const express = require("express");
const DataSource = require("./config/data-source");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const CategoriaController = require("./controller/CategoriaController");
const configController = require("./controller/ConfiguracoesController");
const pedidoController = require("./controller/PedidosController");
const produtoController = require("./controller/ProdutoController");
const subcategoriaController = require("./controller/SubcategoriasController");
const usuarioController = require("./controller/UsuarioController");
const cuponsController = require("./controller/CuponsController");
const clienteController = require("./controller/ClienteController");

const app = express();
app.use(express.json());

app.get("/clientes", clienteController.listarClientes);
app.get("/clientes/:id", clienteController.buscarClientePorId);
app.post("/clientes", clienteController.adicionarCliente);
app.put("/clientes/:id", clienteController.atualizarCliente);
app.delete("/clientes/:id", clienteController.excluirCliente);

app.get("/configuracoes", configController.listarConfiguracoes);
app.get("/configuracoes/:id", configController.buscarConfiguracaoPorId);
app.post("/configuracoes", configController.adicionarConfiguracao);
app.put("/configuracoes/:id", configController.atualizarConfiguracao);
app.delete("/configuracoes/:id", configController.excluirConfiguracao);

app.get("/cupons", cuponsController.getAllCupons);
app.get("/cupons/:id", cuponsController.getCupomById);
app.post("/cupons", cuponsController.addCupom);
app.put("/cupons/:id", cuponsController.updateCupom);
app.delete("/cupons/:id", cuponsController.deleteCupom);

app.post("/categories", CategoriaController.createCategory);
app.get("/categories", CategoriaController.getAllCategories);
app.put("/categories/:id", CategoriaController.updateCategory);
app.delete("/categories/:id", CategoriaController.deleteCategory);

app.get("/pedidos", pedidoController.getAllPedidos);
app.get("/pedidos/:id", pedidoController.getPedidoById);
app.post("/pedidos", pedidoController.addPedido);
app.put("/pedidos/:id", pedidoController.updatePedido);
app.delete("/pedidos/:id", pedidoController.deletePedido);

app.get("/produtos", produtoController.getAllProdutos);
app.get("/produtos/:id", produtoController.getProdutoById);
app.post("/produtos", produtoController.addProduto);
app.put("/produtos/:id", produtoController.updateProduto);
app.delete("/produtos/:id", produtoController.deleteProduto);

app.get("/subcategorias", subcategoriaController.getAllSubcategorias);
app.get("/subcategorias/:id", subcategoriaController.getSubcategoriaById);
app.post("/subcategorias", subcategoriaController.addSubcategoria);
app.put("/subcategorias/:id", subcategoriaController.updateSubcategoria);
app.delete("/subcategorias/:id", subcategoriaController.deleteSubcategoria);

app.get("/usuarios", usuarioController.listarUsuarios);
app.get("/usuarios/:id", usuarioController.buscarUsuarioPorId);
app.post("/usuarios", usuarioController.adicionarUsuario);
app.put("/usuarios/:id", usuarioController.atualizarUsuario);
app.delete("/usuarios/:id", usuarioController.excluirUsuario);

// Inicializa o banco de dados
DataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
    app.listen(3000, () =>
      console.log("Servidor rodando em http://localhost:3000")
    );
  })
  .catch((error) => console.log("Erro ao conectar no banco de dados:", error));
