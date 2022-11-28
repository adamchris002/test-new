import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (username.length === 0 || password.length === 0) {
      alert("Please fill all data field");
    } else {
      const value = await AsyncStorage.getItem("@user");
      if (value !== null) {
        const allUser = JSON.parse(value);
        console.log(allUser)
        const checkUser = allUser.filter((item) => {
          if (item.username == username && item.password == password) {
            return {
              username: item.username,
              password: item.password
            }
          } 
        })
        if (checkUser.length == 0) {
          alert("Data tidak ditemukan")
        }
        else if (checkUser[0].username == username && checkUser[0].password == password) {
          navigation.navigate("Home")
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Text style={styles.text}>Login Page</Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://i.ibb.co/Pm53kf8/584830f5cef1014c0b5e4aa1-1.png",
            }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>Username: </Text>
          <TextInput
            style={styles.input}
            placeholder="please input your username"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>Password: </Text>
          <TextInput
            style={styles.input}
            placeholder="please input your password"
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text>Don't have an account? click here to create an acount!</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              backgroundColor: "blue",
              width: 100,
              borderRadius: 5,
            }}
            onPress={() => {
              login();
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderWidth: 2,
    borderRadius: 15,
    height: 500,
    width: 370,
    margin: 5,
  },
  text: {
    justifyContent: "center",
    fontSize: 30,
    paddingLeft: 15,
  },
  image: {
    marginTop: 15,
    height: 15,
  },
  inputField: {
    marginLeft: 15,
    flexDirection: "row",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    width: 230,
    paddingLeft: 5,
  },
  inputText: {
    width: 100,
  },
});
export default Login;
