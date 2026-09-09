const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Armazenamento em memória
const usuarios = [];
const alunos = [];
const registrosPresenca = [];

app.get('/', (req, res) => {
  res.send('API da Frequência Escolar funcionando!');
});

// Autenticação de Usuário
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  usuarios.push({ nome, email, senha });
  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
  }
  return res.status(200).json({ mensagem: 'Login efetuado!' });
});

// Cadastro do Aluno pelo Responsável
app.post('/api/cadastrar-aluno', (req, res) => {
  const { nome, cpf, turma } = req.body;

  if (!nome || !cpf || !turma) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos do aluno.' });
  }

  alunos.push({ nome, cpf, turma });
  console.log('Aluno cadastrado:', { nome, cpf, turma });
  return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!' });
});

// Registro de Ponto enviado pelo Tablet da Escola
app.post('/api/registrar-ponto', (req, res) => {
  const { cpf, foto, horaMinuto } = req.body;
  
  const [hora, minuto] = horaMinuto.split(':').map(Number);
  const tempoEmMinutos = hora * 60 + minuto;

  let statusMensagem = "";

  // 07:00 (420m) a 07:50 (470m)
  if (tempoEmMinutos >= 420 && tempoEmMinutos <= 470) {
    statusMensagem = "Seu filho entrou na escola";
  } 
  // 07:51 (471m) a 08:10 (490m)
  else if (tempoEmMinutos > 470 && tempoEmMinutos <= 490) {
    statusMensagem = "Seu filho entrou na segunda aula";
  } 
  // Após 08:10
  else {
    statusMensagem = "Não entrou na escola";
  }

  const registro = { cpf, foto, horario: horaMinuto, mensagem: statusMensagem };
  registrosPresenca.push(registro);

  return res.status(200).json({ mensagem: 'Ponto registrado!', status: statusMensagem });
});

// Buscar notificações do aluno no App dos Pais
app.get('/api/presenca/:cpf', (req, res) => {
  const { cpf } = req.params;
  const lista = registrosPresenca.filter(r => r.cpf === cpf);
  return res.json({ registros: lista });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

