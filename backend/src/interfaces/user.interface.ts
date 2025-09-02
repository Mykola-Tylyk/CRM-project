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
    isVerified: boolean;
}

export interface IUserQuery {
    pageSize: number;
    page: number;
}

export type IUserDTO = Pick<IUser, "name" | "surname" | "email">;
