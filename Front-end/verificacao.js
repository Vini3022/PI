// Se não estiver logado, redireciona para a tela de login
if (localStorage.getItem('logado') !== 'true') {
  alert('Você precisa fazer login para acessar o site!');
  window.location.href = 'login.html';
}

// Função para colocar no botão de sair (se tiver)
function sair() {
  localStorage.removeItem('logado');
  window.location.href = 'login.html';
}