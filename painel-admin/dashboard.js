<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel do Administrador - Frequência Escolar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
    body { background-color: #f4f6f9; color: #333; padding: 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    header { background: #1e1e2f; color: white; padding: 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    h1 { font-size: 20px; }
    .btn-sair { background: #dc3545; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px; }
    h2 { font-size: 16px; margin-bottom: 15px; color: #495057; border-bottom: 2px solid #f1f3f5; padding-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dee2e6; }
    th { background: #f8f9fa; color: #495057; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .badge-admin { background: #d4edda; color: #155724; }
    .badge-user { background: #e2e3e5; color: #383d41; }
    .btn-action { background: #007bff; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .btn-action:hover { background: #0056b3; }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Painel Geral do Administrador</h1>
      <button class="btn-sair" onclick="window.location.href='index.html'">Sair</button>
    </header>

    <!-- Seção de Controle e Listagem de Usuários -->
    <div class="card">
      <h2>Usuários Cadastrados e Permissões</h2>
      <table>
        <thead>
          <tr>
            <th>E-mail / Usuário</th>
            <th>Tipo de Conta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="tabelaUsuarios">
          <!-- Os dados carregados do banco de dados aparecem aqui -->
          <tr>
            <td>pai_exemplo@email.com</td>
            <td><span class="badge badge-user">Usuário Comum</span></td>
            <td><button class="btn-action" onclick="promoverAdmin('pai_exemplo@email.com')">Tornar Administrador</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Seção de Alunos Presentes (Capturados pelo Tablet) -->
    <div class="card">
      <h2>Alunos Presentes na Escola (Tempo Real)</h2>
      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>Turma</th>
            <th>Horário da Foto</th>
          </tr>
        </thead>
        <tbody id="tabelaPresenca">
          <tr>
            <td colspan="4" style="text-align: center; color: #6c757d;">Nenhum registro de presença hoje.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <script>
    // Função executada pelo Administrador para promover um usuário comum a Administrador
    function promoverAdmin(emailUsuario) {
      if (confirm(`Deseja realmente promover ${emailUsuario} a Administrador? Ele terá acesso total ao painel.`)) {
        // No seu backend Node.js, aqui você faria uma chamada para atualizar a permissão no banco de dados
        alert(`O usuário ${emailUsuario} agora é um Administrador do sistema.`);
        
        // Exemplo visual atualizando a tabela na hora
        location.reload();
      }
    }
  </script>

</body>
</html>
