document.addEventListener('DOMContentLoaded', async () => {
  // Pega o ID do hotel enviado pela URL (ex: hotel.html?id=2)
  const urlParams = new URLSearchParams(window.location.search);
  const idHotel = urlParams.get('id');

  if (!idHotel) {
    window.location.href = 'index.html';
    return;
  }

  try {
    // Busca os dados do hotel específico no JSON Server
    const resposta = await fetch(`http://localhost:3000/hoteis/${idHotel}`);
    
    if (!resposta.ok) {
      throw new Error('Hotel não encontrado');
    }

    const hotel = await resposta.json();

    // Aplica a imagem do hotel no Fundo (Background) da página inteira
    if (hotel.imagem) {
      document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${hotel.imagem}')`;
    }

    // Preenche os elementos do HTML com os dados do JSON
    const elNome = document.getElementById('nome-hotel');
    const elPreco = document.getElementById('preco-hotel');
    const elLocal = document.getElementById('localizacao-hotel');
    const elAvaliacao = document.getElementById('avaliacao-hotel');
    const elImg = document.getElementById('imagem-hotel');

    if (elNome) elNome.textContent = hotel.nome;
    if (elPreco) elPreco.innerHTML = `R$ ${hotel.preco} <span>/ noite</span>`;
    if (elLocal) elLocal.textContent = `📍 ${hotel.localizacao || 'Localização não informada'}`;
    if (elAvaliacao) elAvaliacao.textContent = `★ ${hotel.avaliacao || '5.0'}`;
    if (elImg) elImg.src = hotel.imagem;

  } catch (erro) {
    console.error('Erro ao carregar os detalhes do hotel:', erro);
  }
});

// Função da Reserva (chamada pelo formulário)
function confirmarReserva(event) {
  event.preventDefault();
  alert('🎉 Reserva realizada com sucesso! Tenha uma excelente viagem!');
}