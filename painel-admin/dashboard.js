import React, { useState } from 'react';

export default function DashboardAdmin() {
  const [filtro, setFiltro] = useState('TODOS');

  // Dados demonstrativos de frequência do dia
  const alunos = [
    { id: 1, nome: "João Pedro", turma: "8º Ano A", horario: "07:15", status: "PRESENTE", foto: "https://via.placeholder.com/40" },
    { id: 2, nome: "Maria Clara", turma: "8º Ano A", horario: "07:55", status: "ATRASADO", foto: "https://via.placeholder.com/40" },
    { id: 3, nome: "Lucas Silva", turma: "9º Ano B", horario: "--:--", status: "FALTA", foto: null },
    { id: 4, nome: "Ana Beatriz", turma: "7º Ano C", horario: "--:--", status: "JUSTIFICADO", foto: null }
  ];

  const alunosFiltrados = alunos.filter(a => filtro === 'TODOS' || a.status === filtro);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Painel de Gestão Escolar - Frequência Geral</h1>
      
      {/* Cards Indicadores */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px', flex: 1 }}>
          <h3>Presentes</h3>
          <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#155724' }}>1</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', flex: 1 }}>
          <h3>Atrasados (2ª Aula)</h3>
          <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#856404' }}>1</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px', flex: 1 }}>
          <h3>Faltas Não Justificadas</h3>
          <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#721c24' }}>1</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '8px', flex: 1 }}>
          <h3>Faltas Justificadas</h3>
          <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#0c5460' }}>1</p>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filtrar por Status:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
          <option value="TODOS">Todos</option>
          <option value="PRESENTE">Presente</option>
          <option value="ATRASADO">Atrasado</option>
          <option value="FALTA">Falta</option>
          <option value="JUSTIFICADO">Justificado</option>
        </select>
      </div>

      {/* Tabela de Alunos */}
      <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Foto</th>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Horário Entrada</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alunosFiltrados.map((aluno) => (
            <tr key={aluno.id}>
              <td>
                {aluno.foto ? (
                  <img src={aluno.foto} alt="Foto Entrada" style={{ borderRadius: '50%' }} />
                ) : '—'}
              </td>
              <td>{aluno.nome}</td>
              <td>{aluno.turma}</td>
              <td>{aluno.horario}</td>
              <td style={{ fontWeight: 'bold' }}>{aluno.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
