import { configureStore } from '@reduxjs/toolkit'
import settingsSliceReducer from './settingsSlice'

const store = configureStore({
    reducer:{
        settings:settingsSliceReducer
    }
})

window.store = store

export default store