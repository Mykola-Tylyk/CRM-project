import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IPaginatedResponse } from "../../../interfaces/paginated-response.interface";
import { IUser, IUserDTO } from "../../../interfaces/user.interface";
import {
    blockUser,
    getAllUsers,
    saveUser,
    unBlockUser,
} from "../../../services/user.service";

type UserSliceType = {
    users: IPaginatedResponse<IUser>;
    loadState: boolean;
    errorMessage: string | null;
    trigger: boolean | null;
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
    trigger: null,
};

const loadUsers = createAsyncThunk<
    IPaginatedResponse<IUser>,
    { pageSize: number; page: number; order?: string },
    { rejectValue: string }
>(
    "userSlice/loadUsers",
    async (
        {
            pageSize,
            page,
            order,
        }: { pageSize: number; page: number; order?: string },
        thunkAPI,
    ) => {
        try {
            const users = await getAllUsers({ pageSize, page, order });
            return thunkAPI.fulfillWithValue(users);
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

const createUser = createAsyncThunk<IUser, IUserDTO, { rejectValue: string }>(
    "userSlice/createUsers",
    async (userDTO, thunkAPI) => {
        try {
            const createUser = await saveUser(userDTO);
            return thunkAPI.fulfillWithValue(createUser);
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

const banUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "userSlice/banUser",
    async (userId: string, thunkAPI) => {
        try {
            const user = await blockUser(userId);
            return thunkAPI.fulfillWithValue(user);
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

const unbanUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "userSlice/unbanUser",
    async (userId: string, thunkAPI) => {
        try {
            const user = await unBlockUser(userId);
            return thunkAPI.fulfillWithValue(user);
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

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loadState = false;
            })
            .addCase(
                loadUsers.fulfilled,
                (state, action: PayloadAction<IPaginatedResponse<IUser>>) => {
                    state.users = action.payload;
                    state.loadState = true;
                },
            )
            .addCase(loadUsers.rejected, (state) => {
                state.loadState = true;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.trigger = !state.trigger;
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
            .addMatcher(
                isPending(loadUsers, createUser, banUser, unbanUser),
                (state) => {
                    state.errorMessage = null;
                },
            )
            .addMatcher(
                isFulfilled(loadUsers, createUser, banUser, unbanUser),
                (state) => {
                    state.errorMessage = null;
                },
            )
            .addMatcher(
                isRejected(loadUsers, banUser, unbanUser),
                (state, action) => {
                    state.errorMessage = action.payload ?? "Unknown error";
                },
            ),
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUsers,
    createUser,
    banUser,
    unbanUser,
};
