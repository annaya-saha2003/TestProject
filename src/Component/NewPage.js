import react, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { productlisting } from '../ApiController/CallApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default  async function NewPage(){
	// const [product,setProduct]=useState([])
	//  const header=useSelector((state)=>{
    //           return state
	//  })

	//  console.log(header)

	
	// const submit= async ()=>{
	// 	let body={
	// 		"paged": 1,
	// 		"limit": 4

	// 	}
		
	// 	let res = await productlisting('https://chitfund.weavers-web.com/wp-json/application/v1/product-listing', body, header)
	  
	// 	 if(res){
	// 		console.log(res)
	// 		//  let Allproduct=res.data.data.productList.productsLists
	// 		//  let newArray=[]
	// 		//  Allproduct.forEach(element => {
	// 		// 	// console.log(element)
	// 		// 	newArray.push(element)
	// 		//  });
	// 		//  setProduct(newArray)
	// 	 }else{
	// 		console.log('d',res)
	// 	 }
	// }
        
	return(
		<View>
			<TouchableOpacity>
				<Text>
					hi
				</Text>
			</TouchableOpacity>
			{/* <FlatList
			data={product}
			renderItem={(item)=>{
                  return(
					<View>
						  <Image source={{ uri: item.item.featuredImage }} style={{width:200,height:200}}/>
						  <Text>{item.item.productID}</Text>
						</View>
				  )
			}}
			/> */}
		</View>
		
	)
}