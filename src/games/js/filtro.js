function normalizeGenre(s) {
  if (!s) return '';
  return s
    .toString()
    .normalize('NFD')                 // separa letras + acentos
    .replace(/[\u0300-\u036f]/g, '')  // remove acentos
    .toLowerCase()
    .trim();
}

const genreButtons = document.querySelectorAll('.genre-btn');
const gameCards = document.querySelectorAll('#game-list .card-link');

genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // atualiza visual dos botões
        genreButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selected = normalizeGenre(button.dataset.genre); 

        gameCards.forEach(card => {
        const cardGenre = normalizeGenre(card.getElementsByClassName('card')[0].dataset.genre || '');
        
        if (selected === 'all' || selected === '' ) {
            card.style.display = 'block';
        } else {
            card.style.display = (cardGenre === selected) ? 'block' : 'none';
        }
        });

        // opcional: se quiser rolar ao topo da lista ao filtrar
        // const list = document.getElementById('game-list');
        // if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});