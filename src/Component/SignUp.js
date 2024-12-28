import react, { useState } from 'react'
import {
		ActivityIndicator, 
		Alert, 
		Image, 
		Modal, 
		StyleSheet,
		Text,
		TextInput, 
		TouchableOpacity, 
		View } from 'react-native'
import { SignUpCalling } from '../ApiController/CallApi'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { setUserUid } from '../redux/slice/Slice'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import AsyncStorage from 'react-native-async-storage/async-storage'
export default function SignUp(){
	const [email, setEmail] = useState()
	const [number, setNumber] = useState()
	const [passWord, setPassword] = useState()
	const [isModal,setIsModal]=useState(false)
	const [name,setName]=useState()
	const [code,setCode]=useState()
	const [errorModal, setErrorModal] = useState(false)
	const [checkEmail, setCheckEmail]=useState(false)
	const [checkPassword, setCheckPassword]=useState(false)
	const [isIndicate, setIsIndicate] = useState(false)
	 
	const dispatch=useDispatch()

	const getEmail = (value) => {
		setEmail(value)
	}
	const getPassWord = (value) => {
		setPassword(value)

	}
	const getcode = (value) => {
		setCode(value)

	}
	const getName = (value) => {
		setName(value)

	}
	const getNumber = (value) => {
		setNumber(value)


	}
	const navigation=useNavigation()
	const validateEmail = (rightemail) => {
		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		return expression.test(String(rightemail))

	}
	 const validatePassword=(vpassword)=>{
		 const expression = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/
		 return expression.test(String(vpassword))
	 }
		const submit = async () => {
               
			let checkEmail = validateEmail(email)
			let checkPassword=validatePassword(passWord)
			
			let body = {
				"fullName":name,
				"email":email,
				"password":passWord,
				"phoneCountryCode":code,
				"phone":number
			}


			if (!number) {
				Alert.alert("provied  your Number ")
			

			} else if (!email) {
				Alert.alert('provied your  Email')

			} else if (!passWord) {
				
				Alert.alert('provied a passWord')

			} else if (!name) {
				Alert.alert('provied your name')

			} else if (!code) {
				Alert.alert('provied your country code')

			} else if (!number) {
				Alert.alert('provied your  number')

			}else if (!checkEmail) {
				      
					Alert.alert('provied your validate email')

			} else if (!checkPassword) {
					Alert.alert('password contain minium 8 characters,upper letter & lower latter')

			  }else{
					
					let res = await SignUpCalling('https://chitfund.weavers-web.com/wp-json/application/v1/signup', body)
				        
					if (res) {
						
						setIsIndicate(false)
						setIsModal(true)
					
						dispatch(setUserUid({
								userUid:res.data.data.profileDetails.accessToken
						 }))
						AsyncStorage.setItem('uid', res.data.data.profileDetails.accessToken)
						setTimeout(() => {
							setIsModal(false)
						}, 2000);
						navigation.navigate('App')

					
					} else {
						console.log('nknk')
						setIsIndicate(false)
						setErrorModal(true)
						setTimeout(() => {
							setErrorModal(false)
						}, 2000);
					}
				
			
			}
			}
            
		
	return (
		<View style={{ flex: 1, justifyContent: "center", backgroundColor:'#ffc9ff' }}>
			<Image source={{ uri:"https://clipart-library.com/images_k/shopping-transparent-background/shopping-transparent-background-7.png"}} style={{width:100,height:100,position:'relative',bottom:80}}/>
			<TextInput style={styles.TextInputStyle} placeholder="Full Name" value={name} onChangeText={getName} />
			<TextInput style={styles.TextInputStyle} placeholder="Email" value={email} onChangeText={getEmail} />
			<TextInput style={styles.TextInputStyle} placeholder="Password" value={passWord} onChangeText={getPassWord} />
			{/* {(checkEmail)?<Text style={{ marginHorizontal:25 ,color:"red"}}></Text>:null } */}
			<TextInput style={styles.TextInputStyle} placeholder="Phone number code" value={code} onChangeText={getcode} />
			<TextInput placeholder="Phone Number" value={number} onChangeText={getNumber} style={styles.TextInputStyle} />

			<TouchableOpacity style={styles.buttonStyle} onPress={submit}>
				<Text style={{ textAlign: "center", color: 'white' }}>
					Sign UP
				</Text>
			</TouchableOpacity>


			<ActivityIndicator size={"large"} color={'purple'} animating={isIndicate} />
		    <Modal  visible={isModal}>
				<View style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)',justifyContent:"center"}}>
					<View style={{backgroundColor:'white',width:300,height:150,borderRadius:20,alignSelf:"center"}}>
						<AntDesign name='checkcircle' color={"green"} size={50} style={styles.iconstyle}   />
						<Text style={{ fontSize: 20, color: 'black', fontWeight: "bold", textAlign: "center" }}>Congratulations</Text>
						<Text style={{ textAlign: "center" }}>Your registration  has been completed Successfully </Text>
					</View>
				</View>
			</Modal>
			<Modal visible={errorModal}>
			    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: "center" }}>
					<View style={{ backgroundColor: 'white', width: 300, height: 150, borderRadius: 20, alignSelf: "center" }}>
						<MaterialIcons name='error' color={"red"} size={50} style={styles.iconstyle} />
						<Text style={{ textAlign: "center" }}>something is wrong check your email or passWord</Text>
					</View>

				</View>

			</Modal>

		</View>
	)
}
const styles = StyleSheet.create({
	TextInputStyle: {
		marginHorizontal: 20,
		marginVertical: 10,
		borderWidth: 1,
		borderRadius: 30,
		height: 35,
		padding: 5,
		borderColor: "purple"
	},
	buttonStyle: {
		marginHorizontal: 15,
		backgroundColor: "purple",
		padding: 12,
		borderRadius: 25
	},
	iconstyle:{
		
		alignSelf:"center",
         position:'relative',
		 bottom:30,
		 backgroundColor:"white",
		 borderRadius:30

	}
	
})