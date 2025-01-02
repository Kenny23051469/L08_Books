import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, Button } from 'react-native';
import { dataSource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  const [mydata, setMydata] = useState([]);

  const getData = async () => {
    let datastr = await AsyncStorage.getItem("alphadata");
    if (datastr != null) {
      let jsondata = JSON.parse(datastr);
      setMydata(jsondata);
    } else {
      setMydata(dataSource);
    }
  };
  getData();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.bookItem}
        onPress={() => navigation.navigate('Edit', { index: index, datastring: JSON.stringify(mydata) })}
      >
        <View style={styles.bookDetails}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.textStyle}>
            <Text style={styles.label}>ISBN: </Text>
            {item.isbn}
          </Text>
          <Text style={styles.textStyle}>
            <Text style={styles.label}>Copies Owned: </Text>
            {item.copies}
          </Text>
        </View>
        <View style={styles.bookImage}>
          <Image source={{ uri: item.image }} style={styles.imageStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Item" onPress={() => {
        let datastr = JSON.stringify(mydata);
        navigation.navigate('Add', { datastring: datastr })
      }
      }
      />
      <SectionList
        contentContainerStyle={{ padding: 10 }}
        sections={mydata}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebfafc',
  },
  headerText: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookDetails: {
    flex: 2,
    paddingRight: 16,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textStyle: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
  bookImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 4,
  },
});
