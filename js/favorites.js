
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