
export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function addFavorite(book) {
  const favorites = getFavorites();
  const exists = favorites.find(f => f.id === book.id);
  if (!exists) {
    favorites.push(book);
    saveFavorites(favorites);
    return true;
  }
  return false;
}

export function removeFavorite(bookId) {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.id !== bookId);
  saveFavorites(updated);
}

export function isFavorite(bookId) {
  const favorites = getFavorites();
  return favorites.some(f => f.id === bookId);
}

export function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const emptyState = document.getElementById('emptyState');
  const favorites = getFavorites();

  grid.innerHTML = '';

  if (favorites.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  favorites.forEach(book => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300';
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover"/>
      <div class="p-4">
        <h4 class="text-white font-bold text-sm mb-1">${book.title}</h4>
        <p class="text-gray-400 text-xs mb-3">${book.author}</p>
        <button 
          class="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-full transition duration-200"
          data-id="${book.id}"
        >
          🗑️ Remove
        </button>
      </div>
    `;

    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      removeFavorite(book.id);
      renderFavorites();
    });

    grid.appendChild(card);
  });
}