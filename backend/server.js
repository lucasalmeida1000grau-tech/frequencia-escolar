const express = require('express');
const cors = require('cors');

const app = express();

// 1. Libera o CORS para permitir requisições do seu Netlify
app.use(cors());

// 2. Permite que o servidor entenda requisições no formato JSON
app.use(express.json());

// Banco de dados temporário em memória (para testes)
const usuarios = [];

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('API da Frequência Escolar está funcionando!');
});

// Rota de Cadastro (/api/cadastro)
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
  }

  const usuarioExiste = usuarios.find(user => user.email === email);
  if (usuarioExiste) {
    return res.status(400).json({ mensagem: 'Este e-mail já está cadastrado.' });
  }

  // Salva o novo usuário
  const novoUsuario = { id: Date.now(), nome, email, senha };
  usuarios.push(novoUsuario);

  console.log('Usuário cadastrado com sucesso:', novoUsuario);
  return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!', usuario: novoUsuario });
});

// Rota de Login (/api/login)
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(user => user.email === email && user.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
  }

  return res.status(200).json({ mensagem: 'Login efetuado com sucesso!', usuario });
});

// Rota para autenticação com Google (placeholder)
app.get('/auth/google', (req, res) => {
  res.send('Redirecionando para autenticação do Google...');
});

// Configuração da porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
