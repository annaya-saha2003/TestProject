import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { productlisting } from "../ApiController/CallApi";
import { useNavigation } from "@react-navigation/native";

export default  function Product(){
	const [productItem,setProductItem]=useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const [isIndicat, setIsIndicat]=useState(false)

	let header=useSelector(state=> state.userUid.userUid.userUid)
	console.log(header)
	useEffect(()=>{
		submit()
	},[])    
	const submit= async()=>{
		setIsIndicat(true)
       let Body={
			"paged": 1,
				"limit": 4
		}


		let res = await productlisting('https://chitfund.weavers-web.com/wp-json/application/v1/product-listing',Body,header)
                if(res){
					let result=res.data.data.productList.productsLists
					let newArray=[]
					result.forEach(element => {
                         
						newArray.push(element)
					});
					setProductItem(newArray)
					setIsIndicat(false)
				}
	}
	const Navigation=useNavigation()
	const produceinfo=(item)=>{
   
		Navigation.navigate('productDetails', item.item.productID)
	
		
	}
	return(
		<View>
			
			<FlatList
			       data={productItem}
				   renderItem={(item)=>{
					
					return(
						<TouchableOpacity onPress={() => { produceinfo(item) }}>

						
						<View style={{padding:5,alignSelf:"center"}}>
							
							<Image source={{ uri:item.item.featuredImage}} style={{width:320,height:300}}/>
							<Text style={{fontWeight:'bold',color:'black'}}>{item.item.productName}</Text>
							<Text style={{fontSize:20}}>price:{item.item.productSellingPrice}</Text>
							<ActivityIndicator animating={isIndicat} size={"small"} />

						</View>
						</TouchableOpacity>

					)

				   }}
						/>
			
		</View>
	)
}