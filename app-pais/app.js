const API_URL = 'https://frequencia-escolar-online.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const formAluno = document.getElementById('form-aluno');

  if (formAluno) {
    formAluno.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const cpf = document.getElementById('cpf').value;
      const turma = document.getElementById('turma').value;

      if (cpf.length !== 11) {
        alert('O CPF deve conter exatamente 11 dígitos.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/cadastrar-aluno`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, cpf, turma })
        });

        const data = await response.json();
        alert(data.mensagem);

        if (response.ok) {
          formAluno.reset();
          iniciarMonitoramento(cpf);
        }
      } catch (err) {
        alert('Erro ao conectar com o servidor.');
      }
    });
  }
});

function iniciarMonitoramento(cpf) {
  setInterval(async () => {
    try {
      const res = await fetch(`${API_URL}/api/presenca/${cpf}`);
      const data = await res.json();
      
      const avisosDiv = document.getElementById('avisos');
      if (avisosDiv && data.registros && data.registros.length > 0) {
        avisosDiv.innerHTML = '';
        data.registros.forEach(r => {
          avisosDiv.innerHTML += `
            <div class="notificacao" style="border-left: 5px solid #007bff; padding: 15px; background: #e9f5ff; border-radius: 6px; margin-top: 10px;">
              <p><strong>Status:</strong> ${r.mensagem}</p>
              <p><strong>Horário:</strong> ${r.horario}</p>
              ${r.foto ? `<img src="${r.foto}" style="width: 100%; max-width: 200px; border-radius: 8px; margin-top: 10px;">` : ''}
            </div>
          `;
        });
      }
    } catch (err) {
      console.log('Aguardando registros de presença...');
    }
  }, 3000);
}
