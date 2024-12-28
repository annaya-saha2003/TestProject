import { configureStore } from "@reduxjs/toolkit";
import userNameReducer from './../slice/Slice';

const store = configureStore({
	reducer: {
		userUid: userNameReducer
	}
});

export default store;