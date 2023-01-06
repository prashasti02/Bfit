import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SearchBar } from "react-native-elements";

export default function AddActivityScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const searchFunction = (text) => {
        if(text !== '') {
            fetch(`http://192.168.0.61:3001/search/activity?term=${text}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            setData([])
        }
        setSearch(text);
    };

    const onPressItem = (title, units) => {
        setSearch('');
        setData([]);
        navigation.navigate('UpdateCalories', {title, units, food: false});
    }
    const renderItem = ({ item }) => <Item title={item.name} units={item.unit} />;
    const Item = ({ title, units }) => {
        return (
          <View style={styles.item}>
            <TouchableOpacity
                onPress={() => onPressItem(title, units)}
            >
                <Text style={styles.itemText}>{title}</Text>
            </TouchableOpacity>
          </View>
        );
      };

      
    return(
        <View style={styles.container}>
            <SearchBar
                placeholder="ADD ITEM"
                darkTheme
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchInput}
                value={search}
                onChangeText={(text) => searchFunction(text)}
                autoCorrect={false}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
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
    item: {
        marginTop: 30,
        marginHorizontal: 16,
    },
    itemText: {
        color: 'white',
        fontSize: 20
    },
    searchBarContainer :{
          padding: 0,
          borderRadius: 10,
          height: 75,
    },
    searchBarInputContainer :{
        padding: 0,
        borderRadius: 10,
        height: '100%',
    },
    searchInput: {
        fontSize: 20,
        color: 'white'
    },
  });