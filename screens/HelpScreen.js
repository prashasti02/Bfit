import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, TouchableHighlight } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

export default function HelpScreen({ navigation }) {
    return(
        <ScrollView style={styles.container}>
            <Text style = {{color: 'white', fontSize: 30, textAlign: 'center', marginTop: '10%'}}>
            ADD EVERY FOOD ITEM (OR THE CLOSEST POSSIBLE ALTERNATIVE AVAILABLE IN THE APP) IN THE “ADD FOOD ITEM” SECTION AND ALSO ADD ANY EXTRA PHYSICAL ACTIVITY YOU PERFORM DURING THE DAY. TRY TO GET THE “AVAILABLE CALORIES” TO 0 EVERYDAY. DONT WORRY IF YOU CONSUME EXTRA CALORIES, THE APP WILL DEDUCT THAT EXTRA AMOUNT FROM YOUR NEXT DAYS AVAILABLE CALORIES.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2d3436',
      padding: 10,
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });