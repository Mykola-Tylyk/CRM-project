export const RegexEnum = {
    PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/,
    NAME: /^[A-Z][a-z]{1,9}$/,
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,
};
