import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        metric: 'g',
        color: 'default',
        theme: 'light',
    },
    reducers: {
        switchMetric: (state) => {
            state.metric = state.metric === 'g'? 'oz': 'g'
        },
        switchTheme: (state) => {
            state.theme = state.theme === 'light'? 'dark':'light'
        },
        switchColor:(state, action) => {
            console.log(action)
            switch(state.color) {
                case 'b':
                    state.color = 'b'
            }
        },
    },
})

export const {
    switchColor,
    switchMetric,
    switchTheme,
} = settingSlice.actions

export default settingSlice.reducer;