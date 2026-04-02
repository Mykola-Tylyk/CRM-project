import { model, Schema } from "mongoose";

import { IComment } from "../interfaces/comment.interface";

const commentsSchema = new Schema<IComment>(
    {
        orderId: { type: Schema.Types.ObjectId, required: true, ref: "orders" },
        text: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    },
    { timestamps: true, versionKey: false },
);

commentsSchema.index({ orderId: 1, createdAt: -1 });

export const Comment = model<IComment>("comments", commentsSchema);
