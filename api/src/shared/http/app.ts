import "reflect-metadata";

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "@shared/container/index";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

const forwardedPrefixSwagger = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    request.originalUrl =
        (request.headers["x-forwarded-prefix"] || "") + request.url;
    next();
};

app.use(
    "/docs",
    forwardedPrefixSwagger,
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
);

app.use(router);

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json(err.message);
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };
