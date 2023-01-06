import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableHighlight } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <View style = {{marginBottom: '20%', marginTop: '20%', alignItems: 'center', justifyContent: 'center',}}>
                <Image source = {require('../assets/settings.png')} style = {{width:200, height:200}} />
            </View>

            <View style = {{alignItems: 'center', justifyContent: 'center'}}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 0.8, backgroundColor: 'white'}} />
                </View>

                <TouchableHighlight onPress = {() => navigation.navigate('Biometrics')}>
                    <Text style = {styles.buttonText}>UPDATE BIOMETRICS</Text>
                </TouchableHighlight>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 0.7, backgroundColor: 'white'}} />
                </View>

                <TouchableHighlight onPress = {() => navigation.navigate('Goal')}>
                    <Text style = {styles.buttonText}>UPDATE GOAL</Text>
                </TouchableHighlight>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 0.7, backgroundColor: 'white'}} />
                </View>
                <TouchableHighlight onPress = {() => navigation.navigate('Help')}>
                    <Text style = {styles.buttonText}>HELP</Text>
                </TouchableHighlight>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 0.8, backgroundColor: 'white'}} />
                </View>
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
    settingsIcon: {
      height: 50,
      width: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        marginBottom: '3%',
        marginTop: '3%',
    },
    styleLine: {
        height: 200,
        borderBottomWidth: 10,
        borderBottomColor: 'white',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        backgroundColor: 'red',
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