import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, TouchableHighlight } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectPicker from 'react-native-form-select-picker';
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function BiometricsScreen({ navigation }) {
    const [loaded, setLoaded] = useState(false);
    const [biometrics, setInitBio] = useState({});
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {value: '0', label: 'Little to no exercise'},
        {value: '1', label: 'Exercise less than 3 times a week'},
        {value: '2', label: 'Exercise 4 to 5 days a week'},
        {value: '3', label: 'Exercise daily'},
    ]);
    const options = ["Male", "Female"];

    const { handleSubmit, control, formState: { errors } } = useForm();

    const getBiometrics = async () => {
        const valBiometrics = await AsyncStorage.getItem("biometrics")
        const biometrics = JSON.parse(valBiometrics)
        console.log(biometrics)
        setInitBio(biometrics);
        setLoaded(true);
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        setLoaded(false);
    }, []);

    useEffect(() => {
      if(isFocused){ 
        getBiometrics();
      }
    }, [isFocused]);

    const storeBiometrics = async data => {
        try {
            await AsyncStorage.setItem("biometrics", JSON.stringify(data));
            await AsyncStorage.setItem("consumed", "0");
            updateCalories();
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
    const updateCalories = async () => {
        try {
            const valBiometrics = await AsyncStorage.getItem("biometrics")
            const biometrics = JSON.parse(valBiometrics)
            console.log(biometrics)

            const valGoal = await AsyncStorage.getItem("goal")

            if(valGoal !== null) {
                const goal = parseInt(valGoal)

                const cal = calculateCalories(biometrics, goal);
                await AsyncStorage.setItem("calories", cal.toString())
                
                alert("Changes saved");
                navigation.navigate('Home');
            }
            else {
                navigation.navigate('Goal')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const onSubmit = data => {
        storeBiometrics(data);
    };
    
    console.log('errors', errors);

    return(
        <SafeAreaView style = {styles.container}>
            { loaded === true && <View style = {styles.inputContainer}>
                <View style = {styles.inputItem}>
                    <Text style={styles.inputTitle}>HEIGHT (Cm): </Text>
                    <Controller
                        defaultValue={biometrics.height}
                        control={control}
                        render={({field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType="numeric"
                        />
                        )}
                        name="height"
                        rules={{ required: true }}
                    />
                </View>
                <View style = {styles.inputItem}>
                    <Text style={styles.inputTitle}>WEIGHT (Kg): </Text>
                    <Controller
                        defaultValue={biometrics.weight}
                        control={control}
                        render={({field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType="numeric"
                        />
                        )}
                        name="weight"
                        rules={{ required: true }}
                    />
                </View>
                <View style = {styles.inputItem}>
                    <Text style={styles.inputTitle}>AGE (Years): </Text>
                    <Controller
                        defaultValue={biometrics.age}
                        control={control}
                        render={({field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType="numeric"
                        />
                        )}
                        name="age"
                        rules={{ required: true }}
                    />
                </View>
                <View style = {styles.inputItem}>
                    <Text style={styles.inputTitle}>SEX: </Text>
                    <Controller
                        defaultValue={biometrics.sex}
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <SelectPicker
                                style={styles.sexDropdown}
                                titleText='Select Sex'
                                onSelectedStyle={{fontSize: 16, color:'white'}}
			                    onValueChange={(value) => {
                                    onChange(value);
                                }}
                                selected={value}
                            >
                            {Object.values(options).map((val, index) => ( 
                                <SelectPicker.Item label={val} value={val}/>
                            ))}
                        </SelectPicker>
                        )}
                        name="sex"
                        rules={{ required: true }}
                    />
                </View>
                <View style = {[styles.inputItem, {marginTop:20}]}>
                    <Text style={{fontSize: 20, color: 'white',}}>ACTIVITY LEVEL: </Text>
                    <Controller
                        defaultValue={biometrics.activity}
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <DropDownPicker
                                style={{height: 30, zIndex:-1}}
                                containerStyle={styles.activityLevelDropdown}
                                placeholder=''
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={onChange}
                                setItems={setItems}
                                labelProps={{
                                    numberOfLines: 1
                                }}
                                arrowIconContainerStyle={{borderLeftWidth: 1, borderLeftColor: 'black', paddingLeft:3, }}
                                itemSeparator={true}
                                listItemContainerStyle={{ height: 60}}
                            />
                        )}
                        name="activity"
                        rules={{ required: true }}
                    />   
                </View>

                <View style = {{marginTop: '10%', width: '50%', zIndex: -1}}>
                    <Button
                        color = '#ec5990'
                        style = {styles.button}
                        title="SAVE"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        }

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
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%',
    },
    inputItem: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginVertical: '2%',
        paddingRight: '15%',
    },
    inputTitle: {
        fontSize: 26,
        color: 'white',
    },
    inputBox: {
        backgroundColor: '#211E8C',
        borderRadius: 5,
        color: 'white',
        width: '40%',
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        width: 100,
        borderRadius: 10
    },
    sexDropdown: {
        backgroundColor: '#211E8C',
        color: 'white',
        width: '40%',
        paddingLeft: 10,
        borderRadius: 5,
    },
    activityLevelDropdown: {
        width: '40%',
        height: '5%',
        borderRadius: 5,
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