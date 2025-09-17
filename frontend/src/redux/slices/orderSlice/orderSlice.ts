import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IOrder } from "../../../interfaces/order.interface";
import { IPaginatedResponse } from "../../../interfaces/paginated-response.interface";
import { getAllOrders } from "../../../services/order.service";

type OrderSliceType = {
    orders: IPaginatedResponse<IOrder>;
    loadState: boolean;
    errorMessage: string | null;
    hasError: boolean;
    order?: string;
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
    errorMessage: null,
    hasError: false,
    order: undefined,
};

const loadOrders = createAsyncThunk(
    "orderSlice/loadOrders",
    async (
        {
            pageSize,
            page,
            order,
        }: { pageSize: number; page: number; order?: string },
        thunkAPI,
    ) => {
        try {
            const orders = await getAllOrders({ pageSize, page, order });
            return thunkAPI.fulfillWithValue(orders);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                return thunkAPI.rejectWithValue("Page does not exist");
            }
            return thunkAPI.rejectWithValue("Server error");
        }
    },
);

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.hasError = true;
            state.errorMessage = action.payload;
        },
        setOrder(state, action: PayloadAction<string | undefined>) {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(
                loadOrders.fulfilled,
                (state, action: PayloadAction<IPaginatedResponse<IOrder>>) => {
                    state.orders = action.payload;
                    state.errorMessage = null;
                },
            )
            .addCase(loadOrders.rejected, (state, action) => {
                state.loadState = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Unknown error";
                console.log("state: ", state);
                console.log("action: ", action);
            })
            .addMatcher(isFulfilled(loadOrders), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadOrders), (state) => {
                state.loadState = true;
                console.log("Rejected state: ", state);
            }),
});

export const orderSliceActions = { ...orderSlice.actions, loadOrders };
