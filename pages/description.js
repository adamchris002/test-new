import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Description = ({ navigation, route }) => {
  const [listDetailProduct, setListDetaiProduct] = useState([])

  useEffect(() => {
    checkCart()
  }, [])

  const checkCart = async () => {
    const value = await AsyncStorage.getItem("@cart");
    if (value !== null) {
      setListDetaiProduct(JSON.parse(value))
    }
  }

  const addToCart = async() => {

    const obj = {
      id: route.params.dataDescription.id,
      nama: route.params.dataDescription.name,
      detail: route.params.dataDescription.detail,
      price: route.params.dataDescription.price,
      image: route.params.dataDescription.image,
    };

    
    const createData = [...listDetailProduct, obj];
    console.log(obj);
    await AsyncStorage.setItem("@cart", JSON.stringify(createData));
    checkCart()
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={{flex: 1, backgroundColor: "white"}}>
      <View
        style={{
          width: "100%",
          height: "10%",
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            height: 30,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
          }}
          onPress={() => {
            navigation.navigate("Home", {dataDariDetails: listDetailProduct});
          }}
        >
          <Text>Back to Home</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#333",
            right: 0,
            position: "absolute",
            marginRight: 15,
          }}
        >
          Item Description
        </Text>
      </View>
      <Image
        style={styles.picture}
        source={{ uri: `${route.params.dataDescription.image}` }}
      />
      <Text style={styles.price}>Rp. {route.params.dataDescription.price}</Text>
      <Text style={styles.title}>{route.params.dataDescription.name}</Text>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: "white",
        }}
      />
      <Text
        style={{
          marginLeft: 25,
          marginTop: 15,
          fontSize: 19,
          fontWeight: "bold",
        }}
      >
        Product Detail
      </Text>
      <Text style={styles.details}>{route.params.dataDescription.detail}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart()}>
        <Text style={{
          color: "white"
        }}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: 400,
    width: "100%",
    resizeMode: "stretch",
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 15,
  },
  title: {
    fontSize: 19,
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  details: {
    marginLeft: 25,
    fontSize: 19,
    marginTop: 15,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "blue",
    height: 50,
    width: 100,
    borderRadius: 15,
    margin: "auto",
    marginBottom: 100,
    marginLeft: 25,
  }
});

export default Description;
