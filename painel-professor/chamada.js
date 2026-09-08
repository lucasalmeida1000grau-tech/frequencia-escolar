import React, { useState } from 'react';

export default function ChamadaProfessor() {
  const [materia, setMateria] = useState('Matemática');
  const [turma, setTurma] = useState('8º Ano A');
  
  const [alunos, setAlunos] = useState([
    { id: 1, nome: "João Pedro", registroPortaria: true, presenteNaAula: true },
    { id: 2, nome: "Maria Clara", registroPortaria: true, presenteNaAula: true },
    { id: 3, nome: "Lucas Silva", registroPortaria: false, presenteNaAula: false },
    { id: 4, nome: "Ana Beatriz", registroPortaria: true, presenteNaAula: false } // Entrou na escola, mas faltou na aula
  ]);

  const alternarPresenca = (id) => {
    setAlunos(alunos.map(aluno => 
      aluno.id === id ? { ...aluno, presenteNaAula: !aluno.presenteNaAula } : aluno
    ));
  };

  const salvarChamada = () => {
    alert(`Chamada de ${materia} para a turma ${turma} enviada com sucesso!`);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Painel do Professor - Chamada em Sala</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Matéria:</label>
          <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} style={{ padding: '8px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Turma:</label>
          <input type="text" value={turma} onChange={(e) => setTurma(e.target.value)} style={{ padding: '8px' }} />
        </div>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Lista de Alunos</h3>
        {alunos.map(aluno => (
          <div key={aluno.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            borderBottom: '1px solid #ddd' 
          }}>
            <div>
              <strong>{aluno.nome}</strong>
              <br />
              <small style={{ color: aluno.registroPortaria ? 'green' : 'red' }}>
                {aluno.registroPortaria ? '✓ Registrou na Portaria' : '✗ Sem registro na Portaria'}
              </small>
            </div>
            
            <button 
              onClick={() => alternarPresenca(aluno.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: aluno.presenteNaAula ? '#28a745' : '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {aluno.presenteNaAula ? 'Presente' : 'Ausente'}
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={salvarChamada}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Finalizar e Salvar Chamada
      </button>
    </div>
  );
}
