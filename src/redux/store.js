import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import settingsSliceReducer from './settingsSlice'

const reducer = combineReducers({
    settings: settingsSliceReducer,
})

const store = configureStore({
    reducer
})

window.store = store

export default store