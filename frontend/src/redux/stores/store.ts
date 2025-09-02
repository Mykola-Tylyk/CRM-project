import { configureStore } from "@reduxjs/toolkit";

import { orderSlice } from "../slices/orderSlice/orderSlice";
import { userSlice } from "../slices/userSlice/userSlice";

export const store = configureStore({
    reducer: {
        orderSlice: orderSlice.reducer,
        userSlice: userSlice.reducer,
    },
});
