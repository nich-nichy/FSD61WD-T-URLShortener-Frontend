import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
    name: "urlShortner",
    initialState: {
        navbar: {
            isNavbarOpened: false,
            navbarState: true
        },
        urlData: {
            data: [],
            lastGeneratedData: [],
            isNewOneAdded: false
        }
    },
    reducers: {
        setNavbarToggle(state, action) {
            state.navbar.isNavbarOpened = action.payload;
        },
        setNavbarState(state, action) {
            state.navbar.navbarState = action.payload;
        },
        setUrlData(state, action) {
            state.urlData.data = action.payload;
        },
        setLastGeneratedData(state, action) {
            state.urlData.lastGeneratedData = action.payload;
        },
        setIsNewOneAdded(state, action) {
            state.urlData.isNewOneAdded = action.payload;
        }
    },
});

export const { setNavbarToggle, setNavbarState, setUrlData, setLastGeneratedData, setIsNewOneAdded } = urlSlice.actions;
export default urlSlice.reducer;
