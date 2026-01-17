// import joi from "joi";
//
// import { RegexEnum } from "../enums/regex.enum";
//
// export class UserCreateValidator {
//     private static email = joi.string().email().trim();
//     private static firstname = joi.string().pattern(RegexEnum.NAME);
//     private static surname = joi.string().pattern(RegexEnum.NAME);
//
//     public static user = joi.object({
//         email: this.email.required(),
//         firstname: this.firstname.required(),
//         surname: this.surname.required(),
//     });
// }

import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserCreateValidator {
    private static email = joi.string().email().trim().required().messages({
        "string.empty": "Email must not be empty",
        "string.email": "Incorrect email format",
        "any.required": "Email required",
    });

    private static firstname = joi
        .string()
        .pattern(RegexEnum.NAME)
        .required()
        .messages({
            "string.empty": "The field must not be empty",
            "string.pattern.base":
                "The name must begin with a capital letter; after a hyphen or apostrophe, the first letter may be capital or lowercase. All other letters are lowercase. The length is up to 30 characters.",
            "any.required": "Field required",
        });

    private static surname = joi
        .string()
        .pattern(RegexEnum.NAME)
        .required()
        .messages({
            "string.empty": "The field must not be empty",
            "string.pattern.base":
                "The surname must begin with a capital letter; after a hyphen or apostrophe, the first letter may be capital or lowercase. All other letters are lowercase. The length is up to 30 characters.",
            "any.required": "Field required",
        });

    public static user = joi.object({
        email: this.email,
        firstname: this.firstname,
        surname: this.surname,
    });
}
