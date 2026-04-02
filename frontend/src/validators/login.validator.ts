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
            "string.pattern.base": "Email or password not valid",
            "string.empty": "password is required",
        }),
    });

    public static validatePassword = joi.object({
        password: joi
            .string()
            .min(8)
            .message("Min 8 characters")
            .max(16)
            .message("Max 16 characters")
            .pattern(RegexEnum.PASSWORD)
            .message(
                "The password must include at least one number, one uppercase letter, one lowercase letter, and one special character. Spaces are not allowed.",
            )
            .required()
            .messages({
                "string.empty": "Password is required",
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
