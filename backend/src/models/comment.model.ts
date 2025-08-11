import { model, Schema } from "mongoose";

import { IComment } from "../interfaces/comment.interface";

const commentsSchema = new Schema<IComment>(
    {
        comments: [{ type: String, required: true }],
        orderId: { type: Schema.Types.ObjectId, required: true, ref: "orders" },
    },
    { timestamps: true, versionKey: false },
);

export const Comment = model<IComment>("comments", commentsSchema);
