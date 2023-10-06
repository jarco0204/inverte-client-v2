import { configureStore } from '@reduxjs/toolkit'
import settingsSliceReducer from './settingsSlice'
import metaSliceReducer from './metaSlice'

const store = configureStore({
    reducer:{
        settings:settingsSliceReducer,
        meta: metaSliceReducer,
    }
})

window.store = store

export default store