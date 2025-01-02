import React, { useState } from "react";
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [bookTitle, setBookTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [copies, setCopies] = useState("");

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    const handleSubmitButton = () => {
        let mydata = JSON.parse(route.params.datastring);
        const sectionIndex = 0;
        let newBook = {
          title: bookTitle,
          isbn: isbn,
          image: imageLink,
          copies: copies,
        };
      
        mydata[sectionIndex].data.push(newBook);
        let stringdata = JSON.stringify(mydata);
        setData(stringdata);
      };
      

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

            <Button title="Submit"
                onPress={handleSubmitButton}
            />
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
});

export default Add;