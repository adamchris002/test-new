import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = ({ navigation }) => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async() => {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      setUsers(JSON.parse(value));
    }
  }

  const register = async() => {
    if (name.length === 0 || username.length === 0 || email.length === 0|| password.length === 0) {
      alert("Please fill all data field")
    } else {
      const user = {
        id: users.length + 1,
        name: name,
        username: username,
        email: email,
        password: password
      }
      const createUser = [...users, user]
      await AsyncStorage.setItem("@user", JSON.stringify(createUser));
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Text style={styles.text}>Register Page</Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://i.ibb.co/Pm53kf8/584830f5cef1014c0b5e4aa1-1.png",
            }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>Name: </Text>
          <TextInput
            style={styles.input}
            placeholder="please input your name"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>Email: </Text>
          <TextInput
            style={styles.input}
            placeholder="please input your email"
             onChangeText={(email) => setEmail(email)}
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
        <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }} onPress={() => {
            navigation.navigate("Login")
        }}>
          <Text>Already have an account? click here to login!</Text>
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
            }} onPress={() => register()}
          >
            <Text style={{ color: "white" }}>Register</Text>
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
    paddingLeft: 5
  },
  inputText: {
    width: 100,
  },
});

export default Register;
