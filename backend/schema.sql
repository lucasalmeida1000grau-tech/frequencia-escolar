-- Criação da tabela de Alunos
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(20) NOT NULL,
    email_responsavel VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registros de entrada capturados no Tablet da Portaria
CREATE TABLE registro_portaria (
    id SERIAL PRIMARY KEY,
    cpf_aluno VARCHAR(11) REFERENCES alunos(cpf),
    data_horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_url TEXT NOT NULL,
    status VARCHAR(20) NOT NULL -- 'PRESENTE', 'ATRASADO_2A_AULA', 'FORA_DE_HORARIO'
);

-- Chamada realizada em sala de aula pelos Professores
CREATE TABLE chamada_disciplina (
    id SERIAL PRIMARY KEY,
    cpf_aluno VARCHAR(11) REFERENCES alunos(cpf),
    materia VARCHAR(50) NOT NULL,
    turma VARCHAR(20) NOT NULL,
    data_aula DATE DEFAULT CURRENT_DATE,
    presente_na_aula BOOLEAN NOT NULL,
    professor_id INT
);

-- Justificativas enviadas pelos Responsáveis
CREATE TABLE justificativas (
    id SERIAL PRIMARY KEY,
    cpf_aluno VARCHAR(11) REFERENCES alunos(cpf),
    data_falta DATE NOT NULL,
    motivo TEXT NOT NULL,
    status_aprovacao VARCHAR(20) DEFAULT 'PENDENTE', -- 'PENDENTE', 'APROVADO', 'REJEITADO'
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
