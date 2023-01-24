import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterReducer from "./counterScales";
import Auth from "./Auth";

const reducer = combineReducers({
    scales: counterReducer,
    user: Auth,
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

window.store = store;

export default store;
