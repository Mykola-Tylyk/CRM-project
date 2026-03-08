import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class LoginValidator {
    private static email = joi.string().email().trim().required();
    private static password = joi.string().regex(RegexEnum.PASSWORD).required();

    public static login = joi.object({
        email: this.email.messages({
            "string.email": "invalid email",
            "string.empty": "email is required",
        }),
        password: this.password.messages({
            "string.pattern.base":
                "The password must be between 8 and 16 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character. Spaces are not allowed.",
            "string.empty": "password is required",
        }),
    });

    public static validatePassword = joi.object({
        password: this.password.messages({
            "string.pattern.base":
                "The password must be between 8 and 16 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character. Spaces are not allowed.",
            "string.empty": "password is required",
        }),
        confirmPassword: joi
            .any()
            .valid(joi.ref("password"))
            .required()
            .messages({
                "any.only": "Passwords must match",
                "any.required": "confirm password is required",
            }),
    });
}
