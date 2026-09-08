# 🏫 Sistema Inteligente de Controle de Frequência Escolar

Solução tecnológica desenvolvida para automatizar e modernizar o acompanhamento da frequência de alunos na rede pública e privada de ensino, integrando portaria, salas de aula, gestão escolar e comunicação em tempo real com os responsáveis.

---

## 📱 Módulos do Sistema

* **1. App dos Pais / Responsáveis (`/app-pais`)**
  * Cadastro de dependentes via CPF.
  * Recebimento de notificações com horário exato e foto capturada no momento da entrada.
  * Acompanhamento por disciplina/aula ministrada.
  * Envio de justificativas de faltas ou atrasos.

* **2. Painel do Tablet na Portaria (`/painel-tablet`)**
  * Interface em modo Kiosk para os alunos digitarem o CPF.
  * Validação biométrica por foto no momento do acesso.
  * Regra de horários automática (Presença, Entrada na 2ª Aula ou Fora de Horário).

* **3. Painel do Administrador / Gestão (`/painel-admin`)**
  * Dashboard em tempo real com o quantitativo de alunos presentes, atrasados e ausentes.
  * Filtros por turma, período e status de presença.
  * Visualização das fotos de confirmação e aprovação de justificativas enviadas pelos pais.

* **4. Painel do Professor (`/painel-professor`)**
  * Chamada digital rápida por disciplina.
  * Alerta indicando se o aluno entrou na escola (registro na portaria), mas não compareceu à sala.

* **5. Servidor Central / Backend (`/backend`)**
  * Processamento de horários, regras de presença e envio automatizado de notificações e e-mails.
  * Banco de dados relacional para armazenamento seguro dos registros.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend / Mobile:** React, React Native
* **Backend:** Node.js, Express
* **Banco de Dados:** PostgreSQL / Firebase
* **Armazenamento de Imagens:** Cloud Storage

---

## 🔒 Segurança de Dados (LGPD)

O sistema foi desenvolvido seguindo as diretrizes da Lei Geral de Proteção de Dados (LGPD), garantindo a privacidade das fotos e dos dados cadastrais dos alunos e responsáveis.
