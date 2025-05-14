// Servidor simples para o jogo DualWorld
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta atual
app.use(express.static(__dirname));

// Rota padrão que serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor DualWorld rodando em http://localhost:${port}`);
});
