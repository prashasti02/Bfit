import { StatusBar, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import BiometricsScreen from './screens/BiometricsScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AddFoodItemScreen from './screens/AddFoodItemScreen';
import GoalScreen from './screens/GoalScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateCaloriesScreen from './screens/UpdateCaloriesScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="AddFoodItem" component={AddFoodItemScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="AddActivity" component={AddActivityScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="Help" component={HelpScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="Biometrics" component={BiometricsScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="Goal" component={GoalScreen} options = {{headerShown: false}}/>
        <Stack.Screen name="UpdateCalories" component={UpdateCaloriesScreen} options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  settingsIcon: {
    height: 50,
    width: 50,
  },
  settingsButton: {
  },
  calorieDisplay: {
    marginTop: '2.5%',
    height: '25%',
    alignItems: 'center',
  },
  calorieChange: {
    marginTop: '2%',
    height: '40%',
    alignItems: 'center',
  },
  calorieChangeButton: {
    height: '25%',
    width: '70%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#090746',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
  }
});
