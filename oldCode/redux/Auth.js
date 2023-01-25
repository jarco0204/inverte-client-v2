import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
import { createSlice } from "@reduxjs/toolkit";

Auth.configure(awsConfig); // This is already being done in Index

export const user = createSlice({
    name: "user",
    initialState: {
        authenticated: false,
        name: null,
        info: {},
        Auth,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.info = action.payload;
        },
        setByAmounts: (state, action) => {
            state.user = action.payload;
        },
        setAuthentication: (state, action) => {
            state.authenticated = action.payload;
        },
    },
});

export const { setUserInfo, setByAmounts, addScales, setAuthentication } =
    user.actions;

export default user.reducer;
