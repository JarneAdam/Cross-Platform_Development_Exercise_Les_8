import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import List from './screens/List';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e74c3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="List"
          component={List}
          options={{
            title: 'Pokédex',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            title: route.params?.pokemon?.name?.english || 'Pokémon',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
