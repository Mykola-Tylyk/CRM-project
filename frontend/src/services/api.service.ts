import axios, { AxiosError } from "axios";

import { urls } from "../constants/urls";
import { authSliceActions } from "../redux/slices/authSlice/authSlice";
import { store } from "../redux/stores/store";
import { authService } from "./auth.service";

const apiService = axios.create({ baseURL: "/api", withCredentials: true });

let isRefreshing = false;
type IWaitlist = () => void;
const waitlist: IWaitlist[] = [];

apiService.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error: AxiosError) => {
        const configRequest = error.config;

        if (!configRequest) {
            return Promise.reject(error);
        }
        if (
            error.response?.status === 401 &&
            configRequest.url !== urls.auth.refresh &&
            configRequest.url !== urls.auth.login
        ) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    await authService.refresh();
                    runAfterRefresh(true);
                    isRefreshing = false;
                    return apiService(configRequest);
                } catch (refreshError) {
                    store.dispatch(authSliceActions.clearAuth());
                    runAfterRefresh(false);
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve) => {
                subscribeToWaitlist(() => {
                    resolve(apiService(configRequest));
                });
            });
        }
        return Promise.reject(error);
    },
);

const subscribeToWaitlist = (cb: IWaitlist) => {
    waitlist.push(cb);
};

const runAfterRefresh = (success: boolean): void => {
    while (waitlist.length) {
        const cb = waitlist.pop();

        if (cb && success) {
            cb();
        }
    }
};

export { apiService };
