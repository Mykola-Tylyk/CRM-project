import { model, Schema } from "mongoose";
const orderSchema = new Schema({
    age: { type: Number, required: true },
    already_paid: { type: Schema.Types.Mixed, default: null },
    course: { type: String, required: true },
    course_format: { type: String, required: true },
    course_type: { type: String, required: true },
    created_at: { type: Date, required: true },
    email: { type: String, required: true },
    msg: { type: Schema.Types.Mixed, default: null },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: Schema.Types.Mixed, default: null },
    sum: { type: Schema.Types.Mixed, default: null },
    surname: { type: String, required: true },
    utm: { type: String, required: true },
});
export const Order = model("orders", orderSchema);
