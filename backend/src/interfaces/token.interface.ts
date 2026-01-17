import { IBase } from "./base.interface";

export interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

export interface ITokenPayload {
    _id: string;
    iat: number;
    exp: number;
}

export type ITokenModel = Pick<
    IToken,
    "accessToken" | "refreshToken" | "_userId"
>;

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export type IAccessToken = Pick<IToken, "accessToken">;

export type IRefreshToken = Pick<IToken, "refreshToken">;
