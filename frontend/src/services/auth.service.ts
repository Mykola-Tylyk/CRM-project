import { urls } from "../constants/urls";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { IUser } from "../interfaces/user.interface";
import { apiService } from "./api.service";

const authService = {
    async login(email: string, password: string): Promise<IUser> {
        const { data } = await apiService.post(urls.auth.login, {
            email,
            password,
        });
        return data;
    },

    async logout() {
        await apiService.post(urls.auth.logout);
    },

    async refresh() {
        await apiService.post(urls.auth.refresh);
    },

    async me(): Promise<IUser> {
        const { data } = await apiService.get(urls.auth.me);
        return data;
    },

    async getActionToken(
        userId: string,
        type: ActionTokenTypeEnum,
    ): Promise<string> {
        const { data } = await apiService.get(
            urls.auth.actionById(type, userId),
        );
        return data;
    },
    async activateOrRecoveryUser(
        token: string,
        password: string,
        type: ActionTokenTypeEnum,
    ): Promise<IUser> {
        const { data } = await apiService.post(
            urls.auth.actionByToken(type, token),
            {
                password,
            },
        );
        return data;
    },
};

export { authService };
