import { Request, Response } from "express";
import { signupUser } from "./auth.service";

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await signupUser(name, email, password);

    res.status(201).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};