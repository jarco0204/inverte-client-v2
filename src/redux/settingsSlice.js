import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    metric: 'grams',
    color: 'default',
    theme: 'light',
}

function switchMetricsReducer (state) {
    state.metric = state.metric === 'g'? 'oz': 'g'
}

function switchThemeReducer(state) {
    state.theme = state.theme === 'light'? 'dark':'light'
}

function switchColorReducer(state, action) {
    console.log(action)
    switch(state.color) {
        case 'b':
            state.color = 'b'
    }
}

const settingSlice = createSlice({
    name:'settings',
    initialState,
    reducer: {
        switchMetrics: switchMetricsReducer,
        switchTheme:switchThemeReducer,
        switchColor:switchColorReducer,
    }
})

export const {
    switchColor,
    switchMetrics,
    switchTheme,
} = settingSlice.actions

export default settingSlice.reducer