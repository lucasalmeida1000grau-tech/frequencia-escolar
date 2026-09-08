const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Configuração do envio de e-mail (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seu-email@escola.com',
    pass: process.env.EMAIL_PASS || 'sua-senha-de-app'
  }
});

// Rota principal: Registra a entrada do aluno via Tablet
app.post('/api/registrar-presenca', async (req, res) => {
  try {
    const { cpfAluno, fotoBase64 } = req.body;
    
    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const tempoEmMinutos = hora * 60 + minuto;
    const horaFormatada = `${hora}:${minuto < 10 ? '0' : ''}${minuto}`;

    let status = '';
    let mensagem = '';

    // 7:00 (420 min) até 7:50 (470 min) -> No Horário
    if (tempoEmMinutos >= 420 && tempoEmMinutos <= 470) {
      status = 'PRESENTE';
      mensagem = `Seu filho marcou presença e entrou na escola no horário normal às ${horaFormatada}.`;
    } 
    // 7:50 (471 min) até 8:10 (490 min) -> Entrada para a 2ª Aula
    else if (tempoEmMinutos > 470 && tempoEmMinutos <= 490) {
      status = 'ATRASADO_2A_AULA';
      mensagem = `Atenção: Seu filho chegou atrasado às ${horaFormatada} e entrou para a 2ª aula.`;
    } 
    // Fora desses horários
    else {
      status = 'FORA_DE_HORARIO';
      mensagem = `Registro realizado fora do horário padrão de entrada (${horaFormatada}).`;
    }

    // Exemplo de busca de e-mail do pai no banco de dados (Simulação)
    const emailResponsavel = "pai@exemplo.com"; 

    // Dispara o e-mail para o responsável com a foto em anexo
    await transporter.sendMail({
      from: '"Sistema Escolar" <notificacao@escola.gov.br>',
      to: emailResponsavel,
      subject: `[Frequência Escolar] Atualização de presença - ${status}`,
      html: `<p>Olá,</p><p>${mensagem}</p><p>Confira a foto registrada na portaria abaixo:</p>`,
      attachments: [
        {
          filename: `presenca_${cpfAluno}.jpg`,
          content: fotoBase64.split(';base64,').pop(),
          encoding: 'base64'
        }
      ]
    });

    return res.status(200).json({
      sucesso: true,
      status,
      horario: horaFormatada,
      mensagem
    });

  } catch (erro) {
    console.error('Erro ao registrar presença:', erro);
    return res.status(500).json({ sucesso: false, erro: 'Erro interno no servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
