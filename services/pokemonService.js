const API_URL = 'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/refs/heads/master/pokedex.json';

/**
 * Fetches Pokémon data from the API
 * @returns {Promise<Array>} Array of Pokémon objects
 */
export const fetchPokemon = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};
