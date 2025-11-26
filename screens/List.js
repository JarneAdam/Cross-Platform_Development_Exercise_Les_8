import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { fetchPokemon } from '../services/pokemonService';

const List = ({ navigation }) => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    filterPokemon();
  }, [searchQuery, pokemon]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await fetchPokemon();
      setPokemon(data);
      setFilteredPokemon(data);
      setError(null);
    } catch (err) {
      setError('Failed to load Pokémon data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = () => {
    if (!searchQuery.trim()) {
      setFilteredPokemon(pokemon);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = pokemon.filter(({ name }) =>
      name.english.toLowerCase().includes(query)
    );
    setFilteredPokemon(filtered);
  };

  const handlePokemonPress = (item) => {
    navigation.navigate('Detail', { pokemon: item });
  };

  const renderPokemonItem = ({ item }) => {
    const { id, name, image } = item;
    
    return (
      <TouchableOpacity
        style={styles.pokemonItem}
        onPress={() => handlePokemonPress(item)}
      >
        <Image
          source={{ uri: image?.sprite }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonId}>#{id.toString().padStart(3, '0')}</Text>
          <Text style={styles.pokemonName}>{name?.english}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPokemon}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek een Pokémon"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={filteredPokemon}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingBottom: 10,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
  },
  pokemonImage: {
    width: 64,
    height: 64,
    marginRight: 15,
  },
  pokemonInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonId: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default List;
