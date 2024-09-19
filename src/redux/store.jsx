import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./slices/urlSlice";

export const store = configureStore({
    reducer: {
        urlShortner: urlReducer,
    },
});
