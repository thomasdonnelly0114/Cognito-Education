import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productSlice";
import backetSlice from "../reducers/backetSlice";
import searchSlice from "../reducers/searchSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: backetSlice,
        searchTerm: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;