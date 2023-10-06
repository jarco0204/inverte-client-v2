import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        color: 'default',
        theme: 'light',
    },
    reducers: {
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
    switchTheme,
} = settingSlice.actions

export default settingSlice.reducer;
