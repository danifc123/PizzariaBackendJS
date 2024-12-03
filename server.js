const express = require("express");
const bodyParser = require("body-parser");
const AppDataSource = require("./data-source");
const categoryRoutes = require("./routes/categoryRoutes");
const configuracaoRoutes = require("./routes/ConfiguracaoRoutes");

const app = express();
app.use(express.json());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/categorias", categoryRoutes);
app.use("/configuracoes", configuracaoRoutes);

// Inicializa o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
    app.listen(3000, () =>
      console.log("Servidor rodando em http://localhost:3000")
    );
  })
  .catch((error) => console.log("Erro ao conectar no banco de dados:", error));
