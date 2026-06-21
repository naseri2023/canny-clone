import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const errorMiddleware =
    (err:Error, req:Request, res:Response, next:NextFunction) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};