import { Auth } from "aws-amplify";
import awsConfig from '../aws-exports'
import { createSlice } from '@reduxjs/toolkit' 

Auth.configure(awsConfig);

export const user = createSlice({
    name: 'user',
    initialState: {
        authenticated: false,
        name: null,
        scales: {},
        counter:0,
        info: {},
        Auth,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.info = action.payload
        },
        setByAmounts: (state, action) => {
            state.user = action.payload
        },
        addScales: (state, action) => {
            state.scales[action.payload[0]] = action.payload[1]
        },
        setAuthetication: (state, action) => {
            console.log(state.authenticated)
            console.log(action.payload)
            state.authenticated = action.payload
            console.log(state.authenticated)

        },
    },
})

export const { setUserInfo, setByAmounts, addScales, setAuthetication } = user.actions

export default user.reducer;