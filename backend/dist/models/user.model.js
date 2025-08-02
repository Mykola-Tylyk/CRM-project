import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
export const User = model("users", userSchema);
