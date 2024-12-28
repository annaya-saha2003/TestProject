import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Splash() {
	const navigation=useNavigation()
	return(
		<View style={{ flex: 1, backgroundColor: '#ffc9ff' }}>
			<Image source={{ uri:'https://png.pngtree.com/png-clipart/20211017/original/pngtree-let-s-gor-for-shopping-png-image_6857382.png'}}  style={{width:'80%',height:150,alignSelf:"center",marginTop:100}}/>
			<Text style={{textAlign:"center", color:"black"}}>Join us And Enjoy Credit Free Shoping Instantly</Text>
            <View style={{position:'relative',bottom:0}}>

			
				<TouchableOpacity style={{ backgroundColor:"purple",padding:10,borderRadius:20,marginHorizontal:30,marginTop:290}} onPress={()=>{
					navigation.navigate('Signup')
			}}>
				<Text style={{color:"white",textAlign:"center"}}>Create Account</Text>
			</TouchableOpacity>

				<TouchableOpacity style={{ borderColor:"purple",borderWidth:1, padding: 10, borderRadius: 20,marginHorizontal:30,marginVertical:15 }} onPress={()=>{
					navigation.navigate('login')	
			}}>
					<Text style={{ color: "purple", textAlign: "center" }}>Log in</Text>
			</TouchableOpacity>
			</View>
	</View>
	)
}