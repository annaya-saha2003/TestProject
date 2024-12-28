import React from "react";
// import Main from "./Component/Connect";
// import Connect from "./Connect";
// import Splash from "./Component2/Splash";
// import Navigation from "./Component2/nravigation";
// import Home from "./Component2/home";
// import Newaxios from "./Component2/newaxsios";
// import APP_STORE from "./Redux_backup/Store/Store";
import store from "./redux/store/Store";
import { Provider } from "react-redux";
import NewPage from "./Component/NewPage";
import SignUp from "./Component/SignUp";
import Signin from "./Component/SignIn";
import Navigation from "./Component/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Component/Splash";


function App()
 {
	return (  
		<Provider store={store}>
			
			{/* <Splash/> */}
				<Navigation  />
		
		
        
		</Provider>
    )
}
export default App