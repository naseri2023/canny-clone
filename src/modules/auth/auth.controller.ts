import { Request, Response } from "express";
import { signupUser, signinUser } from "./auth.service";
import {asyncHandler} from "../../utils/async-handler";

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const result = await signupUser(name, email, password);

    res.status(201).json({
        success: true,
        data: result.user,
    });
};

export const signin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await signinUser(email, password);

    res.json({
        success: true,
        data: result,
    });
});

