import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";

const auth = "/auth";
const users = "/users";
const orders = "/orders";
const comments = "/comments";

export const urls = {
    auth: {
        actionById: (type: ActionTokenTypeEnum, id: string) =>
            `${auth}/${type}/${id}`,

        actionByToken: (type: ActionTokenTypeEnum, token: string) =>
            `${auth}/${type}/${token}`,
        login: `${auth}/sign-in`,
        refresh: `${auth}/refresh`,
        logout: `${auth}/logout`,
        me: `${auth}/me`,
    },
    users: {
        base: `${users}`,
        byId: (id: string) => `${users}/${id}`,
        block: (id: string) => `${users}/block/${id}`,
        unblock: (id: string) => `${users}/unblock/${id}`,
    },
    orders: {
        base: `${orders}`,
        export: `${orders}/export`,
    },
    comments: {
        base: `${comments}`,
        byId: (orderId: string) => `${comments}/${orderId}`,
    },
};
