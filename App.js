import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import pages
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Description from "./pages/description";
import Cart from "./pages/cart";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Description" component={Description}/>
        <Stack.Screen name="Cart" component={Cart}/>
        <Stack.Screen name="Logout" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;