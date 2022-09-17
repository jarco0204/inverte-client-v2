import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import counterReducer from  './counterScales'
import Auth from './Auth'

const reducer = combineReducers({
    scales: counterReducer,
    Auth,
})

const store = configureStore({
    reducer,
})

window.store = store

export default store