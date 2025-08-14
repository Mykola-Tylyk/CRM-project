import joi from "joi";

export class CommentValidator {
    private static comment = joi.string().min(1).max(200).trim();

    public static create = joi.object({
        comment: this.comment.required().messages({
            "string.min": "comment must be at least 1 character",
            "string.max":
                "The comment must contain no more than 200 characters",
        }),
    });
}
