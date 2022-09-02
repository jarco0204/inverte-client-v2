import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import counterReducer from  './counterScales'

const reducer = combineReducers({
    scales: counterReducer,
})

const store = configureStore({
    reducer,
})

window.store = store

export default store