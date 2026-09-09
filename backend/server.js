const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const usuarios = [];
const alunos = [];
const salas = []; // Armazena as turmas criadas pelo ADM (ex: { codigo: '7a2026', nomeTurma: '7º Ano A' })
const registrosPresenca = [];

// 1. Cadastro de Usuário (Pais/Responsaveis) - Sem Google
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExistente = usuarios.find(u => u.email === email);

  if (usuarioExistente) {
    return res.status(400).json({ mensagem: 'Este e-mail já foi cadastrado. Faça login!' });
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

// 2. Painel do Administrador (Login ADM: adm1 / 07adm01)
app.post('/api/adm/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'adm1' && senha === '07adm01') {
    return res.status(200).json({ sucesso: true });
  }
  return res.status(401).json({ mensagem: 'Credenciais de Administrador inválidas.' });
});

// ADM cria uma nova sala/código
app.post('/api/adm/criar-sala', (req, res) => {
  const { codigo, nomeTurma } = req.body;
  if (!codigo || !nomeTurma) {
    return res.status(400).json({ mensagem: 'Preencha o código e o nome da turma.' });
  }
  if (salas.some(s => s.codigo === codigo)) {
    return res.status(400).json({ mensagem: 'Este código de sala já existe.' });
  }
  salas.push({ codigo, nomeTurma });
  return res.status(201).json({ mensagem: 'Sala criada com sucesso!' });
});

// ADM lista todas as salas e registros gerais em tempo real
app.get('/api/adm/dados', (req, res) => {
  res.json({ salas, alunos, registros: registrosPresenca });
});

// 3. Cadastrar Aluno pelo Responsável (vinculado a uma turma existente)
app.post('/api/cadastrar-aluno', (req, res) => {
  const { nome, cpf, codigoTurma } = req.body;
  const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';

  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ mensagem: 'O CPF precisa ter exatamente 11 dígitos.' });
  }

  const turmaExiste = salas.find(s => s.codigo === codigoTurma);
  if (!turmaExiste) {
    return res.status(400).json({ mensagem: 'O código da turma/sala informado não existe.' });
  }

  // Atualiza ou adiciona o aluno
  const index = alunos.findIndex(a => a.cpf === cpfLimpo);
  if (index >= 0) {
    alunos[index] = { nome, cpf: cpfLimpo, codigoTurma, turmaNome: turmaExiste.nomeTurma };
  } else {
    alunos.push({ nome, cpf: cpfLimpo, codigoTurma, turmaNome: turmaExiste.nomeTurma });
  }

  return res.status(201).json({ mensagem: 'Seu familiar foi cadastrado, quando ele entrar na escola você saberá' });
});

// 4. Validar Código da Sala no Tablet
app.post('/api/tablet/validar-sala', (req, res) => {
  const { codigo } = req.body;
  const sala = salas.find(s => s.codigo === codigo);
  if (!sala) {
    return res.status(404).json({ mensagem: 'Código de sala inválido ou não cadastrado pelo ADM.' });
  }
  return res.status(200).json({ mensagem: 'Sala encontrada', turma: sala.nomeTurma });
});

// 5. Registro do Ponto pelo Tablet da Sala
app.post('/api/registrar-ponto', (req, res) => {
  const { cpf, foto, horaMinuto, codigoTurma } = req.body;
  const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';

  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ mensagem: 'Digite o CPF correto com 11 dígitos.' });
  }

  // Verifica se o aluno está cadastrado e se pertence a esta exata sala do tablet
  const aluno = alunos.find(a => a.cpf === cpfLimpo);
  if (!aluno) {
    return res.status(404).json({ mensagem: 'CPF não cadastrado por nenhum responsável.' });
  }
  if (aluno.codigoTurma !== codigoTurma) {
    return res.status(400).json({ mensagem: `Este aluno pertence à turma ${aluno.turmaNome}, não a esta sala!` });
  }

  const [hora, minuto] = horaMinuto.split(':').map(Number);
  const tempoEmMinutos = hora * 60 + minuto;

  let statusMensagem = "";
  if (tempoEmMinutos >= 420 && tempoEmMinutos <= 470) { // 07:00 - 07:50
    statusMensagem = "Entrou na primeira aula (Presente)";
  } else if (tempoEmMinutos > 470 && tempoEmMinutos <= 490) { // 07:51 - 08:10
    statusMensagem = "Entrou na segunda aula (Atrasado)";
  } else if (tempoEmMinutos > 490 && tempoEmMinutos < 740) { // 08:11 - 12:19
    statusMensagem = "Não entrou na escola (Falta)";
  } else if (tempoEmMinutos >= 740) { // 12:20 em diante
    statusMensagem = "Os alunos foram liberados da escola!";
  }

  const registro = { 
    cpf: cpfLimpo, 
    nomeAluno: aluno.nome, 
    turma: aluno.turmaNome,
    foto: foto || null, 
    horario: horaMinuto, 
    mensagem: statusMensagem 
  };
  
  registrosPresenca.push(registro);
  return res.status(200).json({ mensagem: 'Ponto registrado!', registro });
});

// Consulta de Presença individual para o App dos Pais
app.get('/api/presenca/:cpf', (req, res) => {
  const cpfLimpo = req.params.cpf.replace(/\D/g, '');
  const lista = registrosPresenca.filter(r => r.cpf === cpfLimpo);
  return res.json({ registros: lista });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
