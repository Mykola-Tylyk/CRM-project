import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
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
    order?: string;
    trigger: null | boolean;
};

const initialState: OrderSliceType = {
    orders: {
        totalItems: 0,
        totalPages: 0,
        prevPage: false,
        nextPage: false,
        data: [],
        groups: [],
    },
    loadState: false,
    errorMessage: null,
    order: undefined,
    trigger: null,
};

const loadOrders = createAsyncThunk(
    "orderSlice/loadOrders",
    async (
        {
            pageSize,
            page,
            order,
            name,
            surname,
            email,
            phone,
            age,
            course,
            course_format,
            course_type,
            status,
            group,
            my,
            start_date,
            end_date,
        }: {
            pageSize: number;
            page: number;
            order?: string;
            name?: string;
            surname?: string;
            email?: string;
            phone?: string;
            age?: number;
            course?: string;
            course_format?: string;
            course_type?: string;
            status?: string;
            group?: string;
            my?: string;
            start_date?: string;
            end_date?: string;
        },
        thunkAPI,
    ) => {
        try {
            const orders = await getAllOrders({
                pageSize,
                page,
                order,
                name,
                surname,
                email,
                phone,
                age,
                course,
                course_format,
                course_type,
                status,
                group,
                my,
                start_date,
                end_date,
            });
            return thunkAPI.fulfillWithValue(orders);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return thunkAPI.rejectWithValue(
                    (e.response?.data as { message?: string })?.message ||
                        "Server error",
                );
            }

            return thunkAPI.rejectWithValue("Unknown server error");
        }
    },
);

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
        },
        setOrder(state, action: PayloadAction<string | undefined>) {
            state.order = action.payload;
        },
        setTrigger(state) {
            state.trigger = !state.trigger;
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
                state.errorMessage =
                    (action.payload as string) || "Unknown error";
            })
            .addMatcher(isPending(loadOrders), (state) => {
                state.loadState = false;
            })
            .addMatcher(isFulfilled(loadOrders), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadOrders), (state) => {
                state.loadState = true;
            }),
});

export const orderSliceActions = { ...orderSlice.actions, loadOrders };
