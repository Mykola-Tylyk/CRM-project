// import { configureStore } from "@reduxjs/toolkit";
//
// import { authSlice } from "../slices/authSlice/authSlice";
// import { orderSlice } from "../slices/orderSlice/orderSlice";
// import { userSlice } from "../slices/userSlice/userSlice";
//
// export const store = configureStore({
//     reducer: {
//         authSlice: authSlice.reducer,
//         orderSlice: orderSlice.reducer,
//         userSlice: userSlice.reducer,
//     },
// });

import {
    combineReducers,
    configureStore,
    createAction,
} from "@reduxjs/toolkit";

import { authSlice } from "../slices/authSlice/authSlice";
import { orderSlice } from "../slices/orderSlice/orderSlice";
import { userSlice } from "../slices/userSlice/userSlice";

/* ---------- RESET ACTION ---------- */
export const resetStore = createAction("app/reset");

/* ---------- COMBINED REDUCER ---------- */
const appReducer = combineReducers({
    authSlice: authSlice.reducer,
    orderSlice: orderSlice.reducer,
    userSlice: userSlice.reducer,
});

/* ---------- ROOT REDUCER (тип берём от appReducer) ---------- */
const rootReducer: typeof appReducer = (state, action) => {
    if (action.type === resetStore.type) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

/* ---------- STORE ---------- */
export const store = configureStore({
    reducer: rootReducer,
});

/* ---------- TYPES ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
