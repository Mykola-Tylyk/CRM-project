import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
    IComment,
    ICommentCreateDTO,
} from "../../../interfaces/comment.interface";
import { IPaginatedResponse } from "../../../interfaces/paginated-response.interface";
import {
    addComment,
    getAllCommentsByOrderId,
} from "../../../services/comment.service";

type CommentSliceType = {
    commentsData: {
        [orderId: string]: { [page: number]: IPaginatedResponse<IComment> };
    };
    currentOrderId: string | null;
    currentPage: number;
    loadState: boolean;
    errorMessage: string | null;
};

const initialState: CommentSliceType = {
    commentsData: {
        null: {
            0: {
                totalItems: 0,
                totalPages: 0,
                prevPage: false,
                nextPage: false,
                data: [],
            },
        },
    },
    currentOrderId: null,
    currentPage: 1,
    loadState: false,
    errorMessage: null,
};

const loadComments = createAsyncThunk<
    IPaginatedResponse<IComment>,
    { pageSize: number; page: number; orderId: string },
    { rejectValue: string }
>(
    "commentSlice/loadComments",
    async (
        {
            pageSize,
            page,
            orderId,
        }: { pageSize: number; page: number; orderId: string },
        thunkAPI,
    ) => {
        try {
            const comments = await getAllCommentsByOrderId({
                pageSize,
                page,
                orderId,
            });
            return thunkAPI.fulfillWithValue(comments);
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

const createComment = createAsyncThunk<
    IComment,
    ICommentCreateDTO,
    { rejectValue: string }
>(
    "commentSlice/createComment",
    async (createDTO: ICommentCreateDTO, thunkAPI) => {
        try {
            const comment = await addComment(createDTO);
            return thunkAPI.fulfillWithValue(comment);
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

export const commentSlice = createSlice({
    name: "commentSlice",
    initialState: initialState,
    reducers: {
        removeByOrderIdComments: (state, action) => {
            delete state.commentsData[action.payload];
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadComments.pending, (state) => {
                state.loadState = false;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.commentsData = {
                    ...state.commentsData,
                    [action.meta.arg.orderId]: {
                        ...state.commentsData[action.meta.arg.orderId],
                        [action.meta.arg.page]: action.payload,
                    },
                };
                state.currentOrderId = action.meta.arg.orderId;
                state.currentPage = action.meta.arg.page;
                state.loadState = true;
            })
            .addMatcher(isPending(loadComments, createComment), (state) => {
                state.errorMessage = null;
            })
            .addMatcher(isFulfilled(loadComments, createComment), (state) => {
                state.errorMessage = null;
            })
            .addMatcher(
                isRejected(loadComments, createComment),
                (state, action) => {
                    state.errorMessage = action.payload ?? "Unknown error";
                    state.loadState = true;
                },
            ),
});

export const commentSliceActions = {
    ...commentSlice.actions,
    loadComments,
    createComment,
};
