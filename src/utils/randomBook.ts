import axios from 'utils/axios';

async function getRandomBook() {
  try {
    const paginationResponse = await axios.get('book', {
      params: { limit: 1, offset: 0 } // get the totalRecords
    });

    const totalRecords = parseInt(paginationResponse.data.pagination.totalRecords, 10);

    if (!totalRecords || totalRecords === 0) {
      throw new Error('No books available');
    }

    const randomOffset = Math.floor(Math.random() * totalRecords);
    const randomBookResponse = await axios.get('book', {
      params: { limit: 1, offset: randomOffset } // get a single random book
    });

    const randomBook = randomBookResponse.data.entries[0];
    return randomBook;
  } catch (error) {
    console.error('[randomBook] Error fetching random book:', error);
    throw error;
  }
}

export default getRandomBook;
