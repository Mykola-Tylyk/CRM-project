import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class OrdersValidator {
    private static firstname = joi
        .string()
        .pattern(RegexEnum.NAME)
        .empty("")
        .optional()
        .messages({
            "string.pattern.base":
                "Name must start with a capital letter and contain only letters, hyphens or apostrophes (max 30 characters)",
        });

    private static surname = joi
        .string()
        .pattern(RegexEnum.NAME)
        .empty("")
        .optional()
        .messages({
            "string.pattern.base":
                "Surname must start with a capital letter and contain only letters, hyphens or apostrophes (max 30 characters)",
        });

    private static already_paid = joi.number().empty("").optional().messages({
        "number.base": "Must be number",
    });

    private static email = joi
        .string()
        .email()
        .trim()
        .empty("")
        .optional()
        .messages({
            "string.email": "Invalid email",
        });

    private static phone = joi
        .string()
        .trim()
        .pattern(RegexEnum.PHONE)
        .empty("")
        .optional()
        .messages({
            "string.pattern.base":
                "The phone number must be +380991234567 or 0991234567",
        });

    private static age = joi
        .number()
        .min(1)
        .max(120)
        .empty("")
        .optional()
        .messages({
            "number.base": "Must be number",
            "string.min": "Min 1",
            "string.max": "Max 120",
        });

    private static course = joi
        .string()
        .trim()
        .valid("FS", "QACX", "JCX", "JSCX", "FE", "PCX")
        .insensitive()
        .empty("")
        .optional()
        .messages({
            "any.only":
                "The course can only be one of: FS, QACX, JCX, JSCX, FE, PCX",
        });

    private static course_format = joi
        .string()
        .trim()
        .valid("static", "online")
        .empty("")
        .optional()
        .messages({
            "any.only": "The course_format can only be one of: static, online",
        });

    private static course_type = joi
        .string()
        .trim()
        .valid("pro", "minimal", "premium", "incubator", "vip")
        .empty("")
        .optional()
        .messages({
            "any.only":
                "The course_type can only be one of: pro, minimal, premium, incubator, vip",
        });

    private static status = joi
        .string()
        .trim()
        .valid("in work", "new", "agree", "disagree", "dubbing")
        .empty("")
        .optional()
        .messages({
            "any.only":
                "The course_format can only be one of: in work, new, agree, disagree, dubbing",
        });

    private static group = joi
        .string()
        .min(1)
        .max(10)
        .messages({
            "string.min": "Min 1",
            "string.max": "Max 10",
        })
        .empty("")
        .optional();

    private static newGroup = joi
        .string()
        .min(1)
        .max(10)
        .custom((value, helpers) => {
            if (!value) return value;

            const groups = helpers.prefs.context?.groups;

            const normalized = value.toLowerCase();

            const isExist = groups?.some(
                (g: string) => g.toLowerCase() === normalized,
            );

            if (isExist) {
                return helpers.error("any.custom");
            }

            return value;
        })
        .messages({
            "string.min": "Min 1",
            "string.max": "Max 10",
            "any.custom": "Group already exists",
        })
        .empty("")
        .optional();

    private static sum = joi.number().empty("").optional().messages({
        "number.base": "Must be number",
    });

    public static edit = joi.object({
        name: this.firstname,
        surname: this.surname,
        already_paid: this.already_paid,
        email: this.email,
        phone: this.phone,
        age: this.age,
        course: this.course,
        course_format: this.course_format,
        course_type: this.course_type,
        status: this.status,
        newGroup: this.newGroup,
        group: this.group,
        sum: this.sum,
    });
}
