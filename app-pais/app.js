<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Área dos Pais - Frequência Escolar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
    body { background-color: #f4f6f9; color: #333; padding: 20px; }
    header { background-color: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 15px; }
    h2 { font-size: 18px; margin-bottom: 10px; color: #007bff; }
    p { font-size: 14px; line-height: 1.5; color: #555; }
    .btn-logout { display: inline-block; margin-top: 15px; padding: 10px 15px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; font-weight: bold; }
    .btn-logout:hover { background: #c82333; }
  </style>
</head>
<body>

  <header>
    <h1>Painel do Responsável</h1>
    <p>Acompanhamento de Frequência Escolar</p>
  </header>

  <div class="card">
    <h2>Bem-vindo(a)!</h2>
    <p>Selecione seu aluno ou veja as atualizações de presença mais recentes abaixo.</p>
  </div>

  <div id="conteudo-principal" class="card">
    <h2>Frequência Recente</h2>
    <p id="status-frequencia">Carregando dados do aluno...</p>
  </div>

  <button class="btn-logout" onclick="sair()">Sair da Conta</button>

  <!-- Importa e executa o seu arquivo app.js localizado na mesma pasta -->
  <script src="app.js"></script>

  <script>
    function sair() {
      // Retorna para a página inicial de login
      window.location.href = '../index.html';
    }
  </script>
</body>
</html>
