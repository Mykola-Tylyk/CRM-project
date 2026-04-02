import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    name: string;
    surname: string;
    email: string;
    isActive: boolean;
    lastLogin: Date | null;
    role: string;
    isDeleted: boolean;
    stats: {
        total: number;
        inWork: number;
        agree: number;
        disagree: number;
        dubbing: number;
    };
}

export type IUserDTO = Pick<IUser, "name" | "surname" | "email">;
