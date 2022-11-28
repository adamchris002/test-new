import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const url = "https://online.akomate.com/atma/api/products";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    const unsubscribe = navigation.addListener("focus", () => {
      checkCart();
      console.log(data);
    });

    return () => {
      clearTimeout(interval);
      unsubscribe;
    };
  }, [navigation]);

  const checkCart = async () => {
    const value = await AsyncStorage.getItem("@cart");
    if (value !== null) {
      setCart(JSON.parse(value));
    }
  };

  const addToCart = async (items) => {
    const obj = {
      id: cart.length + 1,
      nama: items.name,
      detail: items.detail,
      price: items.price,
      image: items.image,
    };
    const createData = [...cart, obj];
    setCart(createData);
    await AsyncStorage.setItem("@cart", JSON.stringify(createData));
    checkCart();
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "grey",
              height: 60,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 15,
                marginRight: 5,
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart", { items: cart });
            }}
          >
            <Text>
              Your Cart: {cart.length}
            </Text>
          </TouchableOpacity>
            <View
              style={{ flexDirection: "row", right: 0, position: "absolute" }}
            >
              <TextInput
                onChangeText={(input) => {
                  setSearch(input);
                }}
                style={{
                  borderWidth: 1,
                  width: 150,
                  height: 30,
                  borderRadius: 5,
                  textAlign: "right",
                  paddingRight: 10,
                }}
                placeholder="Type to Search!"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  borderRadius: 10,
                  height: 30,
                  width: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                  marginLeft: 5,
                }}
                onPress={() => {
                  navigation.navigate("Logout");
                }}
              >
                <Text>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            {loading ? (
              <Text>Loading ....</Text>
            ) : (
              data
                .filter((element) => {
                  return element.name.includes(search);
                })
                .map((items) => {
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
                      <TouchableOpacity
                        style={{ width: "100%" }}
                        onPress={() => {
                          navigation.navigate("Description", {
                            dataDescription: items,
                          });
                        }}
                      >
                        <Image
                          style={{
                            height: 175,
                            width: "100%",
                            resizeMode: "stretch",
                            borderRadius: 15,
                          }}
                          source={{ uri: `${items.image}` }}
                        />
                      </TouchableOpacity>
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
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginLeft: 10,
                          marginTop: 10,
                        }}
                      >
                        {items.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 10,
                          height: 60,
                          width: "100%",
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        {items.detail.length <= 30 ? (
                          items.detail
                        ) : (
                          <Text>{items.detail.slice(0, 30)}...</Text>
                        )}
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 12, }}>
                          Rp. {items.price}
                        </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          height: 60,
                          width: "100%",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            marginRight: 10,
                            backgroundColor: "blue",
                            height: 35,
                            width: 75,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => addToCart(items)}
                        >
                          <Text style={{ color: "white", fontSize: 12 }}>Add to Cart</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
            )}
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
    backgroundColor: "white",
  },
});

export default Home;
