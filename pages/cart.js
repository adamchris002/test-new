import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState(null)

  useEffect(() => {
    getData();
    console.log(getData());
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const remove = async (id) => {
    const allData = data.filter((obj) => obj.id !== id);
    setData(allData);
    await AsyncStorage.setItem("@cart", JSON.stringify(allData));
  };

  const getTotal = () => {
    let total = 0;
    data.map((items) => {
      total += items.price
    })
    setTotal(total);
  }

  const getData = async () => {
    const value = await AsyncStorage.getItem("@cart");
    if (value !== null) {
      setData(JSON.parse(value));
      console.log(JSON.parse(value));
    }
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
        <View
        style={{
          width: "100%",
          height: "5%",
          flexDirection: "row",
          backgroundColor: "grey",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ left: 0, position: "absolute", flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#333",
              letterSpacing: 1,
              marginLeft: 15,
            }}
          >
            Cart Page
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            height: 35,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 15,
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text>Back to home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {data.map((value, index) => {
          return (
            <View
              style={{
                borderRadius: 15,
                height: 400,
                width: "40%",
                margin: 10,
                borderStyle: "thin",
                borderWidth: 1,
              }}
            >
              <Image
                style={{
                  height: 175,
                  width: "100%",
                  resizeMode: "stretch",
                  borderRadius: 15,
                }}
                source={{ uri: `${value.image}` }}
              />
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10,
                  backgroundColor: "grey",
                }}
              />
              <Text style={styles.name}>{value.nama}</Text>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                {value.detail}
              </Text>
              <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    marginLeft: 20,
                    fontSize: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  RP. {value.price}
                </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 20,
                    backgroundColor: "red",
                    height: 30,
                    width: 80,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => remove(value.id)}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginBottom: 200 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            height: 30,
            width: 90,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            getTotal();
            showModal();
          }}
        >
          <Text style={{ color: "white" }}>Check Out</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 350,
                width: "80%",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 250,
                  width: "80%",
                  borderBottomWidth: 2,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text style={{fontSize: 36, marginBottom: 10}}>Thank you for shopping with us!</Text>
                <Text style={{fontSize: 36}}>Grand Total: Rp. {total}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{fontSize: 24}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 20,
  },
});

export default Cart;
