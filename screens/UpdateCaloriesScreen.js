import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, Button, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateCaloriesScreen({ route, navigation }) {
    const { title, units, food } = route.params;
    const [ unitTitle, setUnitTitle ] = useState("None");
    const [ unit, setUnit ] = useState(0);
    const [ quantity, setQuantity ] = useState(0);

    const getWeight = async () => {
        const val = await AsyncStorage.getItem("biometrics")
        const parseVal = JSON.parse(val);
        const weight = parseInt(parseVal.weight);
        
        units.map((value) => {
            const calPerMin = Object.values(value)[0]
            const scaledCalPerMin = parseFloat(calPerMin)*weight/80;
            setUnit(scaledCalPerMin);
            setUnitTitle(scaledCalPerMin.toFixed(3).toString()+" kcal/min")
        });
    }

    useEffect(() => {
        getWeight();
    }, [])

    const onSubmit = async () => {
        if(unitTitle === "None") {
            alert("Please select a unit.");
        }
        else {
            try {
                var val = await AsyncStorage.getItem("consumed");
                if(val === null) {
                    val = "0";
                }

                var consumed = parseFloat(val);
                if(food) {
                    consumed += unit*quantity;
                }
                else {
                    consumed -= unit*quantity;
                }

                await AsyncStorage.setItem("consumed", consumed.toString());
                navigation.navigate('Home');
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style = {styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>

            {food === true && <ScrollView>
                {   units.map((item, index) => (
                        <TouchableOpacity 
                            key = {index}
                            onPress={() => {
                                setUnit(item[Object.keys(item)[0]]);
                                setUnitTitle(Object.keys(item)[0]);
                            }}
                            style={{marginBottom:5, flexDirection: 'row', justifyContent: 'space-between'}}
                        >
                            <Text style={{fontSize:25, color: 'white'}}>{Object.keys(item)[0]}</Text>
                            <Text style={{fontSize:25, color: 'white'}}>{item[Object.keys(item)[0]]} {food ? "kcal" : "kcal/min"}</Text>
                        </TouchableOpacity>
                 ))
                }
            </ScrollView>}

            <View style={styles.formContainer}>
                <View style = {styles.inputItem}>
                    <Text style={styles.inputTitle}>Unit: {unitTitle}</Text>
                </View>
                <View style = {styles.inputItem}>
                    {food ? <Text style={styles.inputTitle}>Quantity: </Text> : <Text style={styles.inputTitle}>Time(min): </Text>}
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={setQuantity}
                        value={quantity.toString()}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        color = '#ec5990'
                        title="SAVE"
                        onPress={onSubmit}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    buttonContainer: {
        width: '45%',
        marginTop: '10%'
    },
    quantityContainer: {
        backgroundColor: 'yellow',
        height: '40%',
    },
    formContainer: {
        alignItems: 'center',
        height: '45%',
    },
    inputBox: {
        backgroundColor: '#211E8C',
        borderRadius: 5,
        color: 'white',
        width: '45%',
        textAlign:'center',
        fontSize: 22,
    },
    inputItem: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginBottom: '5%',
        paddingRight: '15%',
    },
    inputTitle: {
        fontSize: 30,
        color: 'white',
    },
    title: {
        alignItems: 'center',
        marginBottom: '5%',
    },
    titleText: {
        fontSize: 30,
        color: 'white',
    },
  });