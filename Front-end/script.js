
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resposta = await fetch('http://localhost:3000/hoteis');
    const hoteis = await resposta.json();

    const conteineres = document.querySelectorAll('.container-rolagem');

    // Preenche as seções da tela com os dados do JSON Server
    conteineres.forEach(container => {
      container.innerHTML = ''; // Limpa o conteúdo estático

      hoteis.forEach(hotel => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-imovel';
        cartao.style.cursor = 'pointer';
        
        // Redireciona para a tela do hotel enviando o ID
        cartao.onclick = () => window.location.href = `hotel.html?id=${hotel.id}`;

        cartao.innerHTML = `
          <div class="imagem-cartao">
            <img src="${hotel.imagem}" alt="${hotel.nome}">
          </div>
          <div class="detalhes-cartao">
            <div class="preco">${hotel.preco}</div>
            <div class="localizacao">${hotel.localizacao}</div>
            <div class="avaliacao">${hotel.avaliacao}</div>
          </div>
        `;

        container.appendChild(cartao);
      });
    });
  } catch (erro) {
    console.error('Certifique-se de que o JSON Server está rodando!', erro);
  }
});