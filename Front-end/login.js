const URL_API = 'http://localhost:3000';

// Função de Cadastro
async function cadastrar(evento) {
  evento.preventDefault();

  // Pega o valor do campo de input do HTML (que tem id="gmail")
  const gmailDigitado = document.getElementById('gmail').value;
  const senhaDigitada = document.getElementById('senha').value;

  // Envia para o JSON Server salvando na propriedade "usuario"
  const resposta = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      usuario: gmailDigitado, 
      senha: senhaDigitada 
    })
  });

  if (resposta.ok) {
    alert('Cadastro realizado com sucesso! Faça login.');
    window.location.href = 'login.html';
  } else {
    alert('Erro ao realizar o cadastro.');
  }
}

// Função de Login
async function entrar(evento) {
  evento.preventDefault();

  // Pega os valores dos inputs do HTML
  const gmailDigitado = document.getElementById('gmail').value;
  const senhaDigitada = document.getElementById('senha').value;

  try {
    // Busca no JSON Server filtrando por usuario=... e senha=...
    const resposta = await fetch(`http://localhost:3000/usuarios?usuario=${gmailDigitado}&senha=${senhaDigitada}`);
    const usuariosEncontrados = await resposta.json();

    if (usuariosEncontrados.length > 0) {
      // Salva que o usuário está logado
      localStorage.setItem('logado', 'true');
      
      // Redireciona para a página principal
      window.location.href = 'index.html';
    } else {
      alert('Gmail ou senha incorretos!');
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
    alert('Certifique-se de que o JSON Server está rodando no terminal!');
  }
}
function alternarSenha() {
  const campoSenha = document.getElementById('senha');
  const btnOlho = document.getElementById('btn-olho');

  if (campoSenha.type === 'password') {
    campoSenha.type = 'text';
    btnOlho.textContent = '🙈';
  } else {
    campoSenha.type = 'password';
    btnOlho.textContent = '👁️';
  }
}