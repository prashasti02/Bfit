import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, TouchableHighlight } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalScreen({ navigation }) {
    const [number, onChangeNumber] = React.useState(null);

    const storeGoal = async (message, goal) => {
        try {
            await AsyncStorage.setItem("goal", goal.toString());
            await AsyncStorage.setItem("consumed", "0");
            updateCalories(message);
        }
        catch (err) {
            console.log(err)
        }
    }

    const calculateCalories = (biometrics, goal) => {
        bmr = 0;
        cal = 0;
        const act = parseInt(biometrics.activity);

        if(biometrics.sex === "Male") {
            bmr = 10 * parseFloat(biometrics.weight) + 6.25 * parseFloat(biometrics.height) - 5 * parseFloat(biometrics.age) + 5;
        }
        else {
            bmr = 10 * parseFloat(biometrics.weight) + 6.25 * parseFloat(biometrics.height) - 5 * parseFloat(biometrics.age) - 161;
        }

        if(act === 0) {
            if(goal === 0) {
                cal = bmr/0.83
            }
            else if(goal === 1) {
                cal = bmr/0.95
            }
            else {
                cal = bmr/1.11
            }
        }
        else if(act === 1) {
            if(goal === 0) {
                cal = bmr/0.727
            }
            else if(goal === 1) {
                cal = bmr/0.803
            }
            else {
                cal = bmr/0.896
            }
        }
        else if(act === 2) {
                if(goal === 0) {
                    cal = bmr/0.628
                }
                else if(goal === 1) {
                    cal = bmr/0.748
                }
                else {
                    cal = bmr/0.829
                }
        }
        else {
                if(goal === 0) {
                    cal = bmr/0.645
                }
                else if(goal === 1) {
                    cal = bmr/0.7
                }
                else {
                    cal = bmr/0.77
                }
        }

        return cal
    }
    const updateCalories = async message => {
        try {
            const valGoal = await AsyncStorage.getItem("goal")
            const goal = parseInt(valGoal)

            const valBiometrics = await AsyncStorage.getItem("biometrics")
            
            if(valBiometrics !== null) {
                const biometrics = JSON.parse(valBiometrics)

                const cal = calculateCalories(biometrics, goal);
                await AsyncStorage.setItem("calories", cal.toString())

                alert(message);
                navigation.navigate('Home');
            }
            else {
                navigation.navigate('Biometrics')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const onSubmit = (message, goal) => {
        storeGoal(message, goal);
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>CHOOSE GOAL</Text>
            </View>

            <View style={styles.goalContainer}>
            <TextInput
                    style={styles.goal}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="GOAL WEIGHT"
                    placeholderTextColor='white'
                    keyboardType="numeric"
                    textAlign="center"
                />
            </View>
                
            <View style={styles.submitContainer}>
                <TouchableHighlight style = {styles.submitButton} onPress = {() => onSubmit("LET'S MAINTAIN YOUR WEIGHT!", 0)}>
                    <Text style = {styles.buttonText}>MAINTAIN</Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.submitButton} onPress = {() => onSubmit("LET'S LOSE SOME WEIGHT!", 1)}>
                    <Text style = {styles.buttonText}>LOSE 0.25 KG PER WEEK</Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.submitButton} onPress = {() => onSubmit("LET'S LOSE SOME WEIGHT!", 2)}>
                    <Text style = {styles.buttonText}>LOSE 0.5 KG PER WEEK</Text>
                </TouchableHighlight>
            </View>

            <Image source = {require('../assets/logo.png')} style = {styles.logo}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 10,
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    titleContainer: {
        marginTop: '10%',
        // backgroundColor: 'red',
        alignItems: 'center',
        height: '15%',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        alignItems: 'center',
        fontSize: 44
    },
    goalContainer: {
        // backgroundColor: 'blue',
        alignItems: 'center',
        height: '15%',
        justifyContent: 'center'
    },
    goal: {
        backgroundColor: '#2B2B2B',
        color:'white',
        height: '50%',
        width: '50%',
        borderRadius: 5,
        fontSize: 25
    },
    submitContainer: {
        // backgroundColor: 'green',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '10%',
        paddingHorizontal: '7%'
    },
    submitButton: {
        height: '20%',
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
        fontSize: 18,
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