import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IPaginatedResponse } from "../../../interfaces/paginated-response.interface";
import { IUser } from "../../../interfaces/user.interface";
import {
    blockUser,
    getAllUsers,
    unBlockUser,
} from "../../../services/user.service";

type UserSliceType = {
    users: IPaginatedResponse<IUser>;
    loadState: boolean;
    errorMessage: string | null;
    hasError: boolean;
};

const initialState: UserSliceType = {
    users: {
        totalItems: 0,
        totalPages: 0,
        prevPage: false,
        nextPage: false,
        data: [],
    },
    loadState: false,
    errorMessage: null,
    hasError: false,
};

const loadUsers = createAsyncThunk<
    IPaginatedResponse<IUser>,
    { pageSize: number; page: number },
    { rejectValue: string }
>(
    "userSlice/loadUsers",
    async (
        { pageSize, page }: { pageSize: number; page: number },
        thunkAPI,
    ) => {
        try {
            const users = await getAllUsers({ pageSize, page });
            return thunkAPI.fulfillWithValue(users);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                if (status === 400) {
                    return thunkAPI.rejectWithValue("Invalid page parameters");
                }

                if (status === 404) {
                    return thunkAPI.rejectWithValue("Users not found");
                }
            }
            return thunkAPI.rejectWithValue("Server error");
        }
    },
);

const banUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "userSlice/banUser",
    async (userId: string, thunkAPI) => {
        try {
            const user = await blockUser(userId);
            return thunkAPI.fulfillWithValue(user);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                if (status === 400) {
                    return thunkAPI.rejectWithValue("Invalid user state");
                }

                if (status === 404) {
                    return thunkAPI.rejectWithValue("User not found");
                }
            }
            return thunkAPI.rejectWithValue("Server error");
        }
    },
);

const unbanUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "userSlice/unbanUser",
    async (userId: string, thunkAPI) => {
        try {
            const user = await unBlockUser(userId);
            return thunkAPI.fulfillWithValue(user);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                if (status === 400) {
                    return thunkAPI.rejectWithValue("Invalid user state");
                }

                if (status === 404) {
                    return thunkAPI.rejectWithValue("User not found");
                }
            }
            return thunkAPI.rejectWithValue("Server error");
        }
    },
);

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.hasError = true;
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(
                loadUsers.fulfilled,
                (state, action: PayloadAction<IPaginatedResponse<IUser>>) => {
                    state.users = action.payload;
                    state.errorMessage = null;
                },
            )
            .addCase(loadUsers.rejected, (state, action) => {
                state.loadState = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Unknown error";
                console.log("state: ", state);
                console.log("action: ", action);
            })
            .addCase(banUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;

                const index = state.users.data.findIndex(
                    (u) => u._id === updatedUser._id,
                );

                if (index !== -1) {
                    state.users.data[index] = updatedUser;
                }
            })
            .addCase(unbanUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;

                const index = state.users.data.findIndex(
                    (u) => u._id === updatedUser._id,
                );

                if (index !== -1) {
                    state.users.data[index] = updatedUser;
                }
            })
            .addMatcher(isFulfilled(loadUsers), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadUsers), (state) => {
                state.loadState = true;
                console.log("Rejected state: ", state);
            }),
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUsers,
    banUser,
    unbanUser,
};
