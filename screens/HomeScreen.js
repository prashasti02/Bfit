import { StatusBar, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
    const [calories, setCalories] = useState(2000);

    const getCalories = async () => {
      try {
        var value1 = await AsyncStorage.getItem("calories");
        if(value1 !== null) {
          var value2 = await AsyncStorage.getItem("consumed");
          if(value2 === null) {
            value2 = '0';
          }
          setCalories(parseInt(value1) - parseInt(value2));
        }
        else {
          navigation.navigate('Biometrics')
        }
      }
      catch (err) {
        console.log(err)
      }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
      if(isFocused){ 
        getCalories();
      }
    }, [isFocused]);

    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight style = {styles.settingsButton} onPress = {() => navigation.navigate('Settings')} underlayColor = {'black'}>
          <Image source = {require('../assets/settings.png')} style = {styles.settingsIcon}/>
        </TouchableHighlight>
        <View style = {styles.calorieDisplay}>
          <View
            style = {{
                marginTop: '5%', 
                height: '20%', 
                alignItems: 'center', 
                justifyContent: 'center'}}
          >
          <Text style = {{fontSize: 20, color: 'white'}}>CALORIES AVAILABLE</Text>
          </View>
          <View 
            style = {{
              backgroundColor: '#242424', 
              marginTop: '7%', 
              height: '40%',
              width: '45%',
              borderRadius: 42,
              alignItems: 'center', 
              justifyContent: 'center'}}
          >
            <Text style = {{fontSize: 30, color: 'white'}}>{calories}</Text>
          </View>
        </View>
        <View style = {styles.calorieChange}>
          <TouchableHighlight style = {styles.calorieChangeButton} onPress = {() => navigation.navigate('AddFoodItem')}>
            <Text style = {styles.buttonText}>ADD FOOD ITEM</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.calorieChangeButton} onPress = {() => navigation.navigate('AddActivity')}>
            <Text style = {styles.buttonText}>ADD ACTIVITY</Text>
          </TouchableHighlight>
        </View>
        <Image source = {require('../assets/logo.png')} style = {styles.logo}/>
      </SafeAreaView>
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
    },
    logo: {
      position: 'absolute',
      bottom: -80,
      right: -130,
      zIndex: 100,
      height: 200,
      width: 300,
    }
  });