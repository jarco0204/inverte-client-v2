import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scales: {},
    counter: 0,
};

export const counterScales = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setByAmount: (state, action) => {
            state.counter = action.payload;
        },
        addScale: (state, action) => {
            state.scales[action.payload[0]] = action.payload[1];
        },
    },
});

export const { setByAmount, addScale, increment } = counterScales.actions;

export default counterScales.reducer;
