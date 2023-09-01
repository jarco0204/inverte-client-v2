import { createSlice } from "@reduxjs/toolkit";

const metaSlice = createSlice({
    name: 'meta',
    initialState: {
        iotThingNames: ["test"],
        restaurantName: "test",
        demo: "False",
        unitOfMass:"g",
    },
    reducers: {
        updateMetaInformation: (state, action) => {
           return { ...state, ...action.payload}
        },
        setUnitOfMass: (state, action) => {
            state.unitOfMass = action.payload
        },
    }
})

export const {
    updateMetaInformation,
    setUnitOfMass,
} = metaSlice.actions

export default metaSlice.reducer;