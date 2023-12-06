import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "", //user id [for logged in users]
    currentLocation: null, //user location coordinates
    selectedLocation: null, //selected location coordinates
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = { ...action.payload };
        },
        setSelectedLocation: (state, action) => {
            state.selectedLocation = { ...action.payload };
        },
    },
});

export const { setCurrentLocation, setSelectedLocation } = userSlice.actions;
export default userSlice.reducer;
