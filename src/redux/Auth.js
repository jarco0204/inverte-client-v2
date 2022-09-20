import { Auth } from "aws-amplify";
import awsConfig from '../aws-exports'
import { createSlice } from '@reduxjs/toolkit' 

Auth.configure(awsConfig);

export const user = createSlice({
    name: 'user',
    info: {},
    reducers: {
        setUserInfo: (state, action) => {
            state.info = action.payload
        }
    }
})

export const { setUserInfo } = Auth.actions

export default Auth.reducer;