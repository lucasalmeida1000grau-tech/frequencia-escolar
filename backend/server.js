const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Suporta envio de fotos em base64

const usuarios = [];
const alunos = [];
const registrosPresenca = [];

// Checa e-mail existente no cadastro
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExistente = usuarios.find(u => u.email === email);

  if (usuarioExistente) {
    return res.status(400).json({ mensagem: 'Este e-mail já está cadastrado. Faça login!' });
  }

  usuarios.push({ nome, email, senha });
  return res.status(201).json({ mensagem: 'Conta criada com sucesso!' });
});

// Login tradicional
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
  }
  return res.status(200).json({ mensagem: 'Login efetuado!' });
});

// Login com Google (redireciona diretamente para o app dos pais)
app.get('/auth/google', (req, res) => {
  res.redirect('https://serene-tapioca-0f5fac.netlify.app/app-pais/');
});

// Cadastrar Aluno (Validação estrita de 11 dígitos de CPF)
app.post('/api/cadastrar-aluno', (req, res) => {
  const { nome, cpf, turma } = req.body;
  const cpfApenasNumeros = cpf ? cpf.replace(/\D/g, '') : '';

  if (cpfApenasNumeros.length !== 11) {
    return res.status(400).json({ mensagem: 'O CPF precisa ter exatamente 11 dígitos.' });
  }

  alunos.push({ nome, cpf: cpfApenasNumeros, turma });
  return res.status(201).json({ mensagem: 'Seu familiar foi cadastrado, quando ele entrar a escola você saberá' });
});

// Registro do Ponto pelo Tablet
app.post('/api/registrar-ponto', (req, res) => {
  const { cpf, foto, horaMinuto } = req.body;
  const cpfApenasNumeros = cpf ? cpf.replace(/\D/g, '') : '';

  if (cpfApenasNumeros.length !== 11) {
    return res.status(400).json({ mensagem: 'Digite o CPF correto com 11 dígitos.' });
  }

  const aluno = alunos.find(a => a.cpf === cpfApenasNumeros);
  const [hora, minuto] = horaMinuto.split(':').map(Number);
  const tempoEmMinutos = hora * 60 + minuto;

  let statusMensagem = "";

  // 07:00 (420m) a 07:50 (470m)
  if (tempoEmMinutos >= 420 && tempoEmMinutos <= 470) {
    statusMensagem = "Seu filho entrou na primeira aula";
  } 
  // 07:51 (471m) a 08:10 (490m)
  else if (tempoEmMinutos > 470 && tempoEmMinutos <= 490) {
    statusMensagem = "Seu filho entrou na segunda aula";
  } 
  // 08:11 (491m) a 12:19 (739m)
  else if (tempoEmMinutos > 490 && tempoEmMinutos < 740) {
    statusMensagem = "Não entrou na escola";
  } 
  // 12:20 (740m) em diante
  else if (tempoEmMinutos >= 740) {
    statusMensagem = "Os alunos foram liberados da escola!";
  }

  const registro = { 
    cpf: cpfApenasNumeros, 
    nomeAluno: aluno ? aluno.nome : 'Aluno', 
    foto, 
    horario: horaMinuto, 
    mensagem: statusMensagem 
  };
  
  registrosPresenca.push(registro);
  return res.status(200).json({ mensagem: 'Ponto registrado!', registro });
});

// Consulta de Presença
app.get('/api/presenca/:cpf', (req, res) => {
  const cpfLimpo = req.params.cpf.replace(/\D/g, '');
  const lista = registrosPresenca.filter(r => r.cpf === cpfLimpo);
  return res.json({ registros: lista });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
