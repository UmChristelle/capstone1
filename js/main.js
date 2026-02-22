
import { addFavorite, isFavorite } from './favorites.js';
import { fetchBooks } from './fetchBooks.js';

function showLoading() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
  document.getElementById('booksGrid').classList.add('hidden');
  document.getElementById('noResults').classList.add('hidden');
}

function hideLoading() {
  document.getElementById('loadingSpinner').classList.add('hidden');
  document.getElementById('booksGrid').classList.remove('hidden');
}

function showNoResults() {
  document.getElementById('noResults').classList.remove('hidden');
  document.getElementById('booksGrid').classList.add('hidden');
}

function renderBooks(books) {
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = '';

  if (books.length === 0) {
    hideLoading();
    showNoResults();
    return;
  }

  books.forEach(book => {
    const alreadySaved = isFavorite(book.id);
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition duration-300';
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover"/>
      <div class="p-4">
        <h4 class="text-white font-bold text-sm mb-1">${book.title}</h4>
        <p class="text-gray-400 text-xs mb-3">${book.author}</p>
        <button 
          class="w-full ${alreadySaved ? 'bg-green-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-xs font-semibold py-2 rounded-full transition duration-200"
          data-id="${book.id}"
          ${alreadySaved ? 'disabled' : ''}
        >
          ${alreadySaved ? '✅ Saved' : '❤️ Add to Favorites'}
        </button>
      </div>
    `;

    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const added = addFavorite(book);
      if (added) {
        btn.textContent = '✅ Saved';
        btn.disabled = true;
        btn.className = 'w-full bg-green-600 cursor-not-allowed text-white text-xs font-semibold py-2 rounded-full transition duration-200';
      }
    });

    grid.appendChild(card);
  });
}

async function init(query = 'fiction') {
  showLoading();
  const books = await fetchBooks(query);
  hideLoading();
  renderBooks(books);
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    await init(query);
  }
});

document.getElementById('searchInput').addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      await init(query);
    }
  }
});

init();