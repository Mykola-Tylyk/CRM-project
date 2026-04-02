import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        isActive: { type: Boolean, default: false },
        lastLogin: { type: Date, default: null },
        role: {
            enum: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.MANAGER,
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;

                return ret;
            },
        },
    },
);

export const User = model<IUser>("users", userSchema);
