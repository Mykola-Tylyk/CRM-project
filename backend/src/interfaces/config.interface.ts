export interface IConfig {
    BACKEND_PORT: string;
    FRONTEND_PORT: string;

    MONGO_URI: string;

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;

    JWT_ACTIVATE_SECRET: string;
    JWT_RECOVERY_SECRET: string;
    JWT_ACTIVATE_LIFETIME: any;
    JWT_RECOVERY_LIFETIME: any;

    FRONTEND_URL: string;
}
