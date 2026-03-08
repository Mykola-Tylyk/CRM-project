import { Response } from "express";

import { ITokenPair } from "../interfaces/token.interface";

export const cookiesService = {
    setCookies(res: Response, tokens: ITokenPair) {
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
    },

    clearCookies(res: Response) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
    },
};
