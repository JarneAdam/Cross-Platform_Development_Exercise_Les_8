import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { typeIcons } from '../utils/localAssets';

const Detail = ({ route }) => {
  const { pokemon } = route.params;
  const { name, image, description, base, type } = pokemon;

  const handleNamePress = async () => {
    const url = `https://bulbapedia.bulbagarden.net/wiki/${name.english.toLowerCase()}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const renderStatItem = ({ item }) => {
    const [statName, statValue] = item;
    
    return (
      <View style={styles.statRow}>
        <Text style={styles.statName}>{statName}</Text>
        <Text style={styles.statValue}>{statValue}</Text>
      </View>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  // Convert base stats object to array for FlatList
  const statsArray = Object.entries(base);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: image?.thumbnail }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={handleNamePress}>
          <Text style={styles.pokemonName}>{name?.english}</Text>
        </TouchableOpacity>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.statsContainer}>
          <FlatList
            data={statsArray}
            renderItem={renderStatItem}
            keyExtractor={(item) => item[0]}
            ItemSeparatorComponent={renderSeparator}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.typesContainer}>
          {type?.map((typeName) => {
            const iconSource = typeIcons[typeName.toLowerCase()];
            return (
              <Image
                key={typeName}
                source={iconSource}
                style={styles.typeIcon}
                resizeMode="contain"
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
  },
  statValue: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  typeIcon: {
    width: 50,
    height: 50,
  },
});

export default Detail;
