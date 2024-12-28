import axios from 'axios'


	export async function SigninCalling(url,body) {		
		try {
			let data = await axios.post(url,body)
			
			return data

		}
		catch (e) {
			console.log("error...",e);
			return null;
		}
	}
    export async function SignUpCalling(url, body) {

	try {
		let data=await axios.post(url,body)
		return data
	}
	catch (e) {
		console.log("error...", e);
		return null;
	}
}
		
export async function productlisting(url, body, header) {
	
	try {
		let newheader = {
			headers: { Authorization: "Bearer  "+header}


		}
		let data = await axios.post(url, body, newheader)
		return data  
	}
	catch (e) {
		console.log("error...", e);
		return null;
	}
}
export async function productDetails(url, body, header) {

	try {
		let newheader = {
			headers: { Authorization: "Bearer  " + header}


		}
		let data = await axios.post(url, body, newheader)
		return data
	}
	catch (e) {
		console.log("error...", e);
		return null;
	}
}


	