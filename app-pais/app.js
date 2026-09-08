import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';

export default function AppPais() {
  const [cpfFilho, setCpfFilho] = useState('');
  const [registro, setRegistro] = useState(null);
  const [justificativa, setJustificativa] = useState('');
  const [enviado, setEnviado] = useState(false);

  // Simulação de recebimento dos dados em tempo real
  const buscarDadosPresenca = () => {
    if (!cpfFilho) return;
    
    // Exemplo de dados retornados do servidor
    setRegistro({
      nomeAluno: "Lucas Silva",
      turma: "8º Ano B",
      status: "PRESENTE",
      horario: "07:35",
      fotoUrl: "https://via.placeholder.com/250",
      mensagem: "Seu filho marcou presença e entrou na escola no horário normal às 07:35.",
      aulas: [
        { materia: "Matemática", estevePresente: true },
        { materia: "História", estevePresente: true },
        { materia: "Português", estevePresente: true },
        { materia: "Ciências", estevePresente: false }
      ]
    });
  };

  const enviarJustificativa = () => {
    if (!justificativa) return;
    setEnviado(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Área do Responsável</Text>

      {/* Cadastro / Busca por CPF */}
      <View style={styles.card}>
        <Text style={styles.label}>CPF do Filho Cadastrado:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite o CPF do aluno" 
          value={cpfFilho}
          onChangeText={setCpfFilho}
          keyboardType="numeric"
        />
        <Button title="Buscar Frequência" onPress={buscarDadosPresenca} />
      </View>

      {registro && (
        <>
          {/* Status do Dia e Foto */}
          <View style={styles.card}>
            <Text style={styles.nomeAluno}>{registro.nomeAluno} - {registro.turma}</Text>
            <Text style={styles.status}>Status Portaria: {registro.status}</Text>
            <Text style={styles.horario}>Horário de Entrada: {registro.horario}</Text>
            
            <Text style={styles.subtitulo}>Foto Capturada na Entrada:</Text>
            <Image source={{ uri: registro.fotoUrl }} style={styles.foto} />
            
            <Text style={styles.mensagem}>{registro.mensagem}</Text>
          </View>

          {/* Frequência por Aula */}
          <View style={styles.card}>
            <Text style={styles.subtitulo}>Presença por Disciplina Hoje:</Text>
            {registro.aulas.map((item, index) => (
              <View key={index} style={styles.linhaAula}>
                <Text style={styles.materia}>{item.materia}</Text>
                <Text style={{ color: item.estevePresente ? 'green' : 'red', fontWeight: 'bold' }}>
                  {item.estevePresente ? 'Em Sala' : 'Ausente'}
                </Text>
              </View>
            ))}
          </View>

          {/* Justificativa de Falta/Atraso */}
          <View style={styles.card}>
            <Text style={styles.subtitulo}>Justificar Falta ou Atraso:</Text>
            {enviado ? (
              <Text style={styles.sucesso}>Justificativa enviada à coordenação com sucesso!</Text>
            ) : (
              <>
                <TextInput 
                  style={[styles.input, { height: 80 }]} 
                  placeholder="Escreva o motivo (ex: consulta médica)..." 
                  value={justificativa}
                  onChangeText={setJustificativa}
                  multiline
                />
                <Button title="Enviar Justificativa" onPress={enviarJustificativa} color="#28a745" />
              </>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f4f9' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 10 },
  nomeAluno: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  status: { fontSize: 16, fontWeight: 'bold', color: '#28a745' },
  horario: { fontSize: 14, color: '#666', marginBottom: 10 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  foto: { width: '100%', height: 200, borderRadius: 8, marginVertical: 10 },
  mensagem: { fontSize: 14, color: '#333', textAlign: 'center' },
  linhaAula: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  materia: { fontSize: 14 },
  sucesso: { color: 'green', fontWeight: 'bold', marginTop: 5 }
});
