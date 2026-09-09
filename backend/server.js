// Banco de dados temporário
const alunos = [];
const registrosPresenca = [];

// Rota para o responsável cadastrar o aluno
app.post('/api/cadastrar-aluno', (req, res) => {
  const { nome, cpf, turma } = req.body;
  alunos.push({ nome, cpf, turma });
  return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!' });
});

// Rota chamada pelo tablet da escola ao bater ponto
app.post('/api/registrar-ponto', (req, res) => {
  const { cpf, foto, horaMinuto } = req.body; // Exemplo horaMinuto: "07:30"
  
  const [hora, minuto] = horaMinuto.split(':').map(Number);
  const tempoEmMinutos = hora * 60 + minuto;

  let statusMensagem = "";

  // 07:00 (420 min) até 07:50 (470 min)
  if (tempoEmMinutos >= 420 && tempoEmMinutos <= 470) {
    statusMensagem = "Seu filho entrou na escola";
  } 
  // 07:51 (471 min) até 08:10 (490 min)
  else if (tempoEmMinutos > 470 && tempoEmMinutos <= 490) {
    statusMensagem = "Seu filho entrou na segunda aula";
  } 
  // Após 08:10
  else {
    statusMensagem = "Não entrou na escola (Horário limite excedido)";
  }

  const novoRegistro = { cpf, foto, horario: horaMinuto, mensagem: statusMensagem };
  registrosPresenca.push(novoRegistro);

  return res.status(200).json({ mensagem: 'Ponto registrado', status: statusMensagem });
});

// Rota para o app dos pais consultar as notificações do filho
app.get('/api/presenca/:cpf', (req, res) => {
  const { cpf } = req.params;
  const lista = registrosPresenca.filter(r => r.cpf === cpf);
  return res.json({ registros: lista });
});
