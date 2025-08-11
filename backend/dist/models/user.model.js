import { model, Schema } from "mongoose";
import { RoleEnum } from "../enums/role.enum";
const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    role: {
        enum: RoleEnum,
        type: String,
        required: true,
        default: RoleEnum.USER,
    },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
export const User = model("users", userSchema);
