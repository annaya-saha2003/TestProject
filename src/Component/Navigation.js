import React, { useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import Signin from "./SignIn";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./Product";
import ProductDtails from "./ProductDetails";
import Splash from "./Splash";
export default function Navigation(){
	
	let header = useSelector(state => state.userUid.userUid)

	
	return(
	
          <NavigationContainer>
			
			{(!header)? <App/>:<Auth/>}
			
		  </NavigationContainer>
	
	)
}

function Auth(){
	const Stack = createStackNavigator();

	return(
		<Stack.Navigator screenOptions={{ headerShown: false }}>

			<Stack.Screen name="Splash" component={Splash}/>
			<Stack.Screen name="Signup" component={SignUp} />
			<Stack.Screen name="login" component={Signin} />

			<Stack.Screen name="App" component={App}/>
			
		</Stack.Navigator>
	)
}
function App() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="product" component={Product} />
			<Stack.Screen name='productDetails' component={ProductDtails} />


		</Stack.Navigator>
	)
}

function Main(){
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Auth" component={Auth} />
			<Stack.Screen name='App' component={App} />


		</Stack.Navigator>
	)
}