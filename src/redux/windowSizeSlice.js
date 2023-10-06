import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    windowSize: 'desktop'
}

function switchWindowSizeReducer (state, action) {
    switch(state.windowSize) {
        case 'desktop':
            state.windowSize = 'mobile'
        case 'mobile':
            state.windowSize = 'desktop'
    }
}