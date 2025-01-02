import React, { useState, useEffect } from "react";
import { StatusBar, Button, SectionList, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const { index, datastring } = route.params;
    let mydata = JSON.parse(datastring);

    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
    };
    
    const indexnum = 0;
    const book = mydata[indexnum].data[index];

    // Set initial state based on the book data
    const [bookTitle, setBookTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [imageLink, setImageLink] = useState(book.image);
    const [copies, setCopies] = useState(book.copies);

    const handleSave = () => {
        const updatedData = [...mydata]; // Copy the original data
        updatedData[indexnum].data[route.params.index] = {
          ...updatedData[indexnum].data[route.params.index],
          title: bookTitle,
          isbn: isbn,
          image: imageLink,
          copies: copies,
        };
        let stringdata = JSON.stringify(updatedData);
        setData(stringdata);
        navigation.navigate('Home');
      };

    const handleDelete = () => {
        Alert.alert("Are you sure?", '',
            [{
                text: "Yes", onPress: () => {
                    mydata[indexnum].data.splice(index, 1);
                    let stringdata = JSON.stringify(mydata);
                    setData(stringdata);
                    navigation.navigate('Home');
                }
            },
            { text: "No" }]);
    }
    
    return (
        <View>
            <Text>Book Title:</Text>
            <TextInput
                style={styles.TextInputStyle}
                value={bookTitle}
                onChangeText={(text) => setBookTitle(text)}
            />

            <Text>ISBN:</Text>
            <TextInput
                style={styles.TextInputStyle}
                value={isbn}
                onChangeText={(text) => setIsbn(text)}
            />

            <Text>Image Link:</Text>
            <TextInput
                style={styles.TextInputStyle}
                value={imageLink}
                onChangeText={(text) => setImageLink(text)}
            />

            <Text>Copies Owned:</Text>
            <TextInput
                style={styles.TextInputStyle}
                value={copies}
                onChangeText={(text) => setCopies(text)}
            />

            <View style={styles.ButtonContainer}>
                <View style={styles.ButtonStyle}>
                    <Button title="Save"
                        onPress={handleSave}
                    />
                </View>

                <View style={styles.ButtonStyle}>
                    <Button title="Delete"
                        onPress={handleDelete}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    TextInputStyle: {
        borderWidth: 1,
        margin: 10
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ButtonStyle: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default Edit;
