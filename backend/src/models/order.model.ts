import { model, Schema } from "mongoose";

import { IOrder } from "../interfaces/order.interface";

const orderSchema = new Schema<IOrder>(
    {
        order_number: { type: Number, unique: true, required: true },
        age: { type: Number, required: true },
        already_paid: { type: Number, default: null },
        course: { type: String, required: true },
        course_format: { type: String, required: true },
        course_type: { type: String, required: true },
        created_at: { type: Date, required: true },
        email: { type: String, required: true },
        msg: { type: String, default: null },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        status: { type: String, default: null },
        sum: { type: Number, default: null },
        surname: { type: String, required: true },
        utm: { type: String, required: true },
        group: { type: String, default: null },
        user_id: { type: Schema.Types.ObjectId, default: null, ref: "users" },
        user_name: { type: String, default: null },
        last_comments: [{ type: Object, default: null }],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        versionKey: false,
    },
);

export const Order = model<IOrder>("orders", orderSchema);
