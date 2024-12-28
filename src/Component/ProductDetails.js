import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, productlisting } from "../ApiController/CallApi";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { compose } from "@reduxjs/toolkit";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { setUserUid } from "../redux/slice/Slice";
import { useNavigation } from "@react-navigation/native";
export default  function ProductDtails({route}){
	const [productItem,setProductItem]=useState({})
	const [productDescription, setproductDescription] = useState({})
	const [productStorage, setProductStorage	] = useState()
	const [isModal,setIsModal]=useState(false)
	const [islogOUtModal, setIslogOUtModal] = useState(false)
	const [indicat,setIndicat]=useState(false)
	let header=useSelector(state=> state.userUid.userUid.userUid)

	
	useEffect(()=>{
       
		submit()
		
		
		
	},[])    
	const submit= async()=>{
	       setIndicat(true)
		   setIsModal(true)
       let Body={
		   "productID": 315
		}


		let res = await productDetails('https://chitfund.weavers-web.com/wp-json/application/v1/products-details',Body,header)
                if(res){
					// setProductPrice(res.data.data.productDetails.productSellingPrice)
					let result = res.data.data.productDetails.colorsLists

				        result.forEach(element => {
							
							if (element.productID == route.params){
								setProductItem(element)
                               setIndicat(false)
							   setIsModal(false)

							  

							}else{
							   setIndicat(false)
							   setIsModal(false)
							
							}
							if (route.params ==591&&631){
								setProductItem(null)
							}
						});
	                     

					let delivery = res.data.data.productDetails.deliveryOption
					setProductStorage(res.data.data.productDetails.storageLists[0].name)
					setproductDescription(res.data.data.productDetails)

                     
				}
	}
	let imgData=[
	
		'https://www.phoneworld.com.pk/wp-content/uploads/2023/08/Samsung-Galaxy-S24-Ultra.jpg',
		'https://jabbareviews.com/wp-content/uploads/3-samsung-galaxy-s24-ultra-rumors-thatll-make-you-skip-iphon_z1hh-scaled.jpg'
	
	]
	const Navigation=useNavigation()
	const dispatch=useDispatch()
	const getlogoutModal =()=>{
		//
		Navigation.navigate('Splash')
		dispatch(setUserUid({
			userUid:null
		}))
	}
	return(
		<ScrollView>
			{(productItem)? 
				
			  
		    <View style={{ padding: 5, backgroundColor:'#e9e9e9',flex:1}}>
				<TouchableOpacity style={{alignSelf:"flex-end",position:'absolute',top:25,zIndex:1,backgroundColor:"white",padding:5,borderRadius:15,right:20}} onPress={getlogoutModal}>
						<AntDesign name='logout' size={20} />

				</TouchableOpacity>

		     {(productItem.productImg)?	<Image source={{ uri: productItem.productImg }} style={{ height: 400, width: 390 ,padding:10,zIndex:0}} />: <View></View>}
				

			<View style={{backgroundColor:'white',marginVertical:5}}>

			
			<Text style={{fontWeight:'bold',color:'black',fontSize:20}}>{productDescription.productName}</Text>
			<Text style={{color:'black',fontWeight:'bold',fontSize:17}}>
				<AntDesign name='arrowdown' size={20} color={'green'}/>

			 <Text style={{color:'green'}}>26%</Text>  {productDescription.currencySymbol}{productDescription.productSellingPrice}</Text> 
			 
			<Text >shippingCost free </Text> 
			</View>

            <View style={{backgroundColor:"white",padding:5}}>
				<Text>
					<Text style={{color:'black',fontWeight:"bold"}}>Details : </Text>{productDescription.productDescription}
				</Text>

			</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', marginVertical: 10 }}>

					<View style={{ alignItems: "center" }}>
						<FontAwesome6 name='reply-all' color="#2602be" size={20} style={{ padding: 10 }} />
						<Text>7 Day returns</Text>
					</View>
					<View style={{ alignItems: "center" }}>
						<FontAwesome6 name='money-check-dollar' color="green" size={20} style={{ padding: 10, }} />
						<Text>Cash On Delivery</Text>

					</View>
					<View style={{ alignItems: "center" }}>
						<MaterialIcons name='gpp-good' color="#02be83" size={25} style={{ padding: 8, }} />
						<Text> Assured</Text>

					</View>
				</View>
				<View style={{ backgroundColor: "white", padding: 5 }}>
					
						<Text style={{ color: 'black', fontWeight: "bold",fontSize:20,marginHorizontal:10,marginVertical:10 }}>HigHlights </Text>
						<View style={{flexDirection:"row"}}>
						<AntDesign name='trademark'  size={28}/>
						<View style={{marginHorizontal:10}}>
							<Text>RAM | ROM</Text>
							<Text>{productStorage}</Text>
						</View>

						</View>
					<View style={{ flexDirection: "row" ,marginVertical:10}}>
						<AntDesign name='camerao' size={28} />
						<View style={{ marginHorizontal: 10 }}>
							<Text>Rear camera</Text>
							<Text>200Mp+50MP+12MP+10MP</Text>
							<Text>
								DLSR LIKE PICTURES & Great Zoom
							</Text>
						</View>

					</View>

					<View style={{ flexDirection: "row", marginVertical: 10 }}>
						<FontAwesome name='battery' size={20} />
						<View style={{ marginHorizontal: 10 ,position:"relative",bottom:10}}>
							<Text >Battary</Text>
							
							<Text>
								5000mah
							</Text>
							<Text >	
								Charging that can last up to 2day*</Text>
						</View>

					</View>

				</View>
				  <View style={{flexDirection:"row",justifyContent:'space-between',padding:10}}>
			        <Button title="add to cart"/>
					<Button title="buy now" />
				</View>
		     </View>:
				<View style={{ paddingVertical:330, alignItems: "center" }}>
					<View style={{ marginHorizontal: 20 }}>
						<MaterialIcons name="error-outline" size={60} />
					</View>
					<Text>Sorry,no product found</Text>
				</View> 
			 }
			 <Modal visible={isModal}>
				<View style={{flex:1,backgroundColor:"white"}}>
					<ActivityIndicator size={'small'} animating={indicat} style={{ position: 'absolute', zIndex: 1, top: 40, right: 170, }} />

				</View>
			 </Modal>
			
		</ScrollView>
	)
}