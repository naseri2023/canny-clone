import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error";

export const authMiddleware = (
    req: any,
    _res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        req.user = decoded;

        next();
    } catch {
        return next(new AppError("Invalid token", 401));
    }
};