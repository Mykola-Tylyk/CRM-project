import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class AuthValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static refreshToken = joi.string().trim();

    public static passwordBody = joi.object({
        password: this.password.required(),
    });

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });

    public static checkRefreshToken = joi.object({
        refreshToken: this.refreshToken.required(),
    });
}
