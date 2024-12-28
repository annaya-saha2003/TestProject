import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, Button, Image, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SigninCalling } from "../ApiController/CallApi"
// import PhoneInput from 'react-native-phone-input'
import PhoneInput from "react-native-phone-number-input";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUserUid } from "../redux/slice/Slice";
export default function Signin(){
	const [email,setEmail]=useState()
	const [name,setName]=useState()
	const [passWord, setPassword] = useState()
	const [isModal, setIsModal] = useState(false)
	const [errorModal, setErrorModal] = useState(false)

	const [isIndicate, seIsIndicate] = useState(false)
     const Navigation=useNavigation()   
	let data = useSelector((state) => {
		return state
	})

     useEffect(()=>{
		
	 })

	 const getEmail=(value)=>{
		setEmail(value)
	  }
	const getPassWord =(value)=>{
		setPassword(value)
		
	  }
    const getName=(value)=>{
		setName(value)

	}
	const validateEmail = (rightemail) => {
		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		return expression.test(String(rightemail))
		
	}
	const dispatch=useDispatch()
	  const submit= async ()=>{
		 
		let checkEmail=validateEmail(email)
		let body={
			"email_or_phone": email,
			"password": passWord,
			"phoneCountryCode": name
		}
	
		
		  if (!name){
			  Alert.alert("provied  your Name ")
 
		} else if (!email){
			  Alert.alert('provied your  Email')
			
		} else if (!passWord){
			  Alert.alert('provied a passWord')

		}else{
			if (!checkEmail) {
				Alert.alert('please input your vaild email Id')
				
			} else {
				seIsIndicate(true)
				// AsyncStorage.getItem('userUid', (err, res) => {
				// 	console.log('kl',res)

				// })
				let res = await SigninCalling('https://chitfund.weavers-web.com/wp-json/application/v1/login',body)
				if (res) {
					seIsIndicate(false)
					setIsModal(true)	     
					setTimeout(() => {
					setIsModal(false)
					},2000);
					dispatch(setUserUid({
						userUid: res.data.data.profileDetails.accessToken
					}))
					Navigation.navigate('App')
				} else {
					
					seIsIndicate(false)

					setErrorModal(true)
					setTimeout(() => {
						setErrorModal(false)
					}, 2000);
				}
			}
		}
		
	// }
	  }

	return(
		
			
		<View style={{ backgroundColor:"#ffc9ff",flex:1,justifyContent:"center"}}>
			<Image source={{ uri: "https://clipart-library.com/images_k/shopping-transparent-background/shopping-transparent-background-7.png" }} style={{ width: 100, height: 100, position: 'relative', bottom: 80 }} />

			<TextInput style={styles.TextInputStyle} placeholder="email" value={email} onChangeText={getEmail} />
			<TextInput style={styles.TextInputStyle} placeholder="Password" value={passWord} onChangeText={getPassWord} secureTextEntry />
			<TextInput placeholder="Country Code" value={name} onChangeText={getName} style={styles.TextInputStyle} />

			<TouchableOpacity style={styles.buttonStyle} onPress={submit}>

				<Text style={{textAlign:"center",color:'white'}}>
				   Sign in
				</Text>
			</TouchableOpacity>
			<ActivityIndicator  size={"large"} color={'purple'} animating={isIndicate}/>
			<Modal visible={isModal}>
				<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: "center" }}>
					<View style={{ backgroundColor: 'white', width: 300, height: 150, borderRadius: 20, alignSelf: "center" }}>
						<AntDesign name='checkcircle' color={"green"} size={50} style={styles.iconstyle} />
						<Text style={{ textAlign: "center" }}>Successfully Logged In </Text>
					</View>
				</View>
			</Modal>
			<Modal visible={errorModal}>
				<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent:"center"}}>
					<View style={{ backgroundColor: 'white', width: 300, height: 150, borderRadius: 20, alignSelf: "center" }}>
						<MaterialIcons name='error' color={"red"} size={50} style={styles.iconstyle} />
						<Text style={{ textAlign: "center" }}>something is wrong check your email or passWord</Text>
					</View>

				</View>

			</Modal>
			{/* </View> */}
		</View>	
		// </View>
	)
}
const styles=StyleSheet.create({
	TextInputStyle:{
		marginHorizontal:20,
		marginVertical:10,
		borderWidth:1,
		borderRadius:30,
		height:35,
		padding: 5,
		borderColor:"purple",
		zIndex:2
		
	}, iconstyle: {

		alignSelf: "center",
		position: 'relative',
		bottom: 30,
		backgroundColor: "white",
		borderRadius: 30

	},
	buttonStyle:{
		marginHorizontal:15,
		backgroundColor:"purple",
		padding:12,
		borderRadius:25
	}
})