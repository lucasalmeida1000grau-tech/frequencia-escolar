// A URL principal do seu backend no Render
const API_URL = 'https://frequencia-escolar-online.onrender.com';

// Exemplo 1: Buscar dados do backend (GET)
async function buscarStatus() {
  try {
    const response = await fetch(`${API_URL}/api/status`);
    const data = await response.json();
    console.log('Resposta do Servidor:', data);
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
  }
}

// Exemplo 2: Enviar dados para o backend (POST)
async function enviarDados(dadosFormulario) {
  try {
    const response = await fetch(`${API_URL}/api/enviar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosFormulario)
    });
    const result = await response.json();
    console.log('Sucesso:', result);
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}
