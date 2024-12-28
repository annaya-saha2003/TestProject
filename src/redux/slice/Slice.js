import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "userName",
	initialState: {
		// userName : "A",
		// userToken: "",
		// userDetail: null
		userUid:'vxdjj21c07kuxjxhmu7v5ovj1x05bvxhu6ztnxtzoi8ztd8mhntt8nzi1pmmy1zlmzka20uluxxolwu3t39lhuwma8wbj87wz431q441uxq2p5m64183tssms272byp65681972r8qvwpkv4v3ivqvi0txkzyrd1334ylohcduujl6xzfjf9o6w0inz33vnz49i3mjvn0oa5dc5xfieyk8a26mqx1ticrrowj3228'
	},
	reducers: {
		setUserUid:(state,action)=>{
			state.userUid=action.payload

		}
	}
});

export const { setUserUid } = userSlice.actions;

export default userSlice.reducer;