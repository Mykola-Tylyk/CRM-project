import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    isActive: boolean;
    lastLogin: Date | null;
    role: RoleEnum;
    isDeleted: boolean;
    // isVerified: boolean;
}

export interface IUserQuery {
    pageSize: number;
    page: number;
    order?: string;
}

export interface IUserUpdateDTO {
    name?: string;
    surname?: string;
    // email?: string;
    // password?: string;
    // isActive?: boolean;
    // lastLogin?: Date | null;
    // role?: RoleEnum;
    // isDeleted?: boolean;
    // isVerified?: boolean;
}

export type IUserCreateDTO = Pick<IUser, "name" | "surname" | "email">;

export type IUserIdDTO = Pick<IUser, "_id">;

export type IUserActivateDTO = Pick<IUser, "isActive" | "password">;

export type IUserPasswordDTO = Pick<IUser, "password">;

export type IUserForOrderDTO = Pick<IUser, "_id" | "name">;
