import {
    createAsyncThunk,
    createSlice,
    isPending,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { ActionTokenTypeEnum } from "../../../enums/action-token-type.enum";
import { IUser } from "../../../interfaces/user.interface";
import { authService } from "../../../services/auth.service";

type AuthSliceType = {
    user: IUser | null;
    errorMessage: string | null;
    status: "idle" | "loading" | "authenticated" | "unauthenticated";
    url: string | null;
};

const initialState: AuthSliceType = {
    user: null,
    errorMessage: null,
    status: "idle",
    url: null,
};

const login = createAsyncThunk<
    IUser,
    { email: string; password: string },
    { rejectValue: string }
>(
    "authSlice/login",
    async (
        { email, password }: { email: string; password: string },
        thunkAPI,
    ) => {
        try {
            // thunkAPI.dispatch(resetStore());

            return await authService.login(email, password);
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

const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "authSlice/logout",
    async (_, thunkAPI) => {
        try {
            await authService.logout();
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

const me = createAsyncThunk<IUser, void, { rejectValue: string }>(
    "authSlice/me",
    async (_, thunkAPI) => {
        try {
            return await authService.me();
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

const getActionUserToken = createAsyncThunk<
    string,
    { userId: string; type: ActionTokenTypeEnum },
    { rejectValue: string }
>(
    "authSlice/getActionUserToken",
    async (
        { userId, type }: { userId: string; type: ActionTokenTypeEnum },
        thunkAPI,
    ) => {
        try {
            const url = await authService.getActionToken(userId, type);
            return thunkAPI.fulfillWithValue(url);
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

const activateOrRecovery = createAsyncThunk<
    IUser,
    {
        token: string;
        password: string;
        type: ActionTokenTypeEnum;
    },
    { rejectValue: string }
>(
    "authSlice/activateOrRecovery",
    async (
        {
            token,
            password,
            type,
        }: {
            token: string;
            password: string;
            type: ActionTokenTypeEnum;
        },
        thunkAPI,
    ) => {
        try {
            const user = await authService.activateOrRecoveryUser(
                token,
                password,
                type,
            );
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

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.status = "unauthenticated";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.status = "authenticated";
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.status = "unauthenticated";
            })
            .addCase(me.pending, (state) => {
                state.status = "loading";
            })
            .addCase(me.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.status = "authenticated";
            })
            .addCase(me.rejected, (state) => {
                state.user = null;
                state.status = "unauthenticated";
            })
            .addCase(getActionUserToken.fulfilled, (state, action) => {
                state.url = action.payload;
            })
            .addCase(activateOrRecovery.fulfilled, (state) => {
                state.user = null;
                state.status = "unauthenticated";
            })
            .addMatcher(
                isPending(
                    login,
                    logout,
                    me,
                    getActionUserToken,
                    activateOrRecovery,
                ),
                (state) => {
                    state.errorMessage = null;
                    state.url = null;
                },
            )
            .addMatcher(
                isRejected(
                    login,
                    logout,
                    me,
                    getActionUserToken,
                    activateOrRecovery,
                ),
                (state, action) => {
                    state.errorMessage = action.payload ?? "Unknown error";
                    state.url = null;
                },
            );
    },
});

export const authSliceActions = {
    ...authSlice.actions,
    login,
    logout,
    me,
    getActionUserToken,
    activateOrRecovery,
};
