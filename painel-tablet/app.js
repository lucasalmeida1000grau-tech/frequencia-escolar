import React, { useState } from 'react';

export default function PainelTablet() {
  const [cpf, setCpf] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Simula a captura da câmera do tablet e envio para o backend
  const registrarPresenca = async () => {
    if (!cpf) {
      alert('Por favor, digite o CPF do aluno.');
      return;
    }

    setCarregando(true);
    setMensagem('');

    // Foto fictícia em Base64 para demonstração
    const fotoExemploBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...";

    try {
      const resposta = await fetch('http://localhost:3000/api/registrar-presenca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpfAluno: cpf,
          fotoBase64: fotoExemploBase64
        })
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        setMensagem(`✅ Registro concluído! Status: ${resultado.status} (${resultado.horario})`);
        setCpf(''); // Limpa o campo para o próximo aluno
      } else {
        setMensagem('❌ Erro ao registrar presença. Tente novamente.');
      }
    } catch (erro) {
      setMensagem('⚠️ Falha na conexão com o servidor da escola.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#eef2f5'
    }}>
      <div style={{
        background: '#fff', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: '#1a365d', marginBottom: '10px' }}>Registro de Frequência</h1>
        <p style={{ color: '#4a5568', marginBottom: '30px' }}>Digite seu CPF para tirar a foto de confirmação</p>

        <input 
          type="text" 
          placeholder="000.000.000-00" 
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '20px',
            textAlign: 'center',
            borderRadius: '8px',
            border: '2px solid #cbd5e0',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        />

        <button 
          onClick={registrarPresenca}
          disabled={carregando}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: carregando ? '#a0aec0' : '#3182ce',
            border: 'none',
            borderRadius: '8px',
            cursor: carregando ? 'not-allowed' : 'pointer'
          }}
        >
          {carregando ? 'Registrando...' : '📸 Tirar Foto e Confirmar'}
        </button>

        {mensagem && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#e2e8f0',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}
