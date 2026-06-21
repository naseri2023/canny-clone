import { Request, Response } from "express";
import {
    signupUser,
    signinUser,
    forgotPasswordService,
    resetPasswordService
} from "./auth.service";
import {asyncHandler} from "../../utils/async-handler";


export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user  = await signupUser(name, email, password);

    res.status(201).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
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

export const forgotPassword = async (
    req: Request,
    res: Response
) => {

    const { email } = req.body;

    await forgotPasswordService(email);

    res.status(200).json({
        success: true,
        message: "Reset email sent",
    });
};

export const resetPassword = async (
    req: Request,
    res: Response
) => {

    const { token, password } = req.body;

    await resetPasswordService(
        token,
        password
    );

    res.status(200).json({
        success: true,
        message: "Password updated",
    });
};

