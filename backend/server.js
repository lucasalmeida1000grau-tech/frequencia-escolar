const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial (para não aparecer mais "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Servidor Backend rodando com sucesso!');
});

// Exemplo de rota de teste/API
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', mensagem: 'API conectada!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
