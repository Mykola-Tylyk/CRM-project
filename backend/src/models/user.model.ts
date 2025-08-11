import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        lastLogin: { type: Date, default: null },
        // total: { type: Number, default: null },
        // inWork: { type: Number, default: null },
        role: {
            enum: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.USER,
        },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", userSchema);
