
const BASE_URL = 'https://openlibrary.org/search.json';

export async function fetchBooks(query = 'javascript') {
  try {
    const response = await fetch(`${BASE_URL}?q=${query}&limit=12`);
    const data = await response.json();

    const books = data.docs.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown Author',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150x200?text=No+Cover'
    }));

    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}