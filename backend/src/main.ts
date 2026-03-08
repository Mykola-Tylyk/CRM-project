/* eslint-disable no-console */
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", apiRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({ status, message });
    },
);

process.on("uncaughtException", (err) => {
    console.log("uncaughtException:", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("Connection to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available!!!");
        } catch (e) {
            console.log(e, "Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(5000, () => {
            console.log("Server listening on 5000");
        });
    } catch (e) {
        console.log(e);
    }
};

start();
