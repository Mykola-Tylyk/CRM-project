import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";

import { IOrder } from "../../../interfaces/order.interface";
import { IPaginatedResponse } from "../../../interfaces/paginated-response.interface";
import { getAllOrders } from "../../../services/order.service";

type OrderSliceType = {
    orders: IPaginatedResponse<IOrder>;
    loadState: boolean;
};

const initialState: OrderSliceType = {
    orders: {
        totalItems: 0,
        totalPages: 0,
        prevPage: false,
        nextPage: false,
        data: [],
    },
    loadState: false,
};

const loadOrders = createAsyncThunk(
    "orderSlice/loadOrders",
    async (
        { pageSize, page }: { pageSize: number; page: number },
        thunkAPI,
    ) => {
        try {
            const orders = await getAllOrders({ pageSize, page });
            return thunkAPI.fulfillWithValue(orders);
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue(
                "some error in orderSlice/loadOrders",
            );
        }
    },
);

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(
                loadOrders.fulfilled,
                (state, action: PayloadAction<IPaginatedResponse<IOrder>>) => {
                    state.orders = action.payload;
                },
            )
            .addCase(loadOrders.rejected, (state, action) => {
                console.log("state: ", state);
                console.log("action: ", action);
            })
            .addMatcher(isFulfilled(loadOrders), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadOrders), (state) => {
                console.log("Rejected state: ", state);
            }),
});

export const orderSliceActions = { ...orderSlice.actions, loadOrders };
