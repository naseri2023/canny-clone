import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { AppError } from "../../errors/app-error";
import crypto from "crypto";
import { sendEmail } from "../../utils/email";

export const signupUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return user; // 👈 مستقیم user
}

export const signinUser = async (email: string, password: string) => {
    const user = await User.findOne({email}).select("+password");

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    }
}

export const forgotPasswordService = async (
    email: string
) => {

    const user = await User.findOne({ email });

    if (!user) {
        return;
    }

    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires =
        new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const resetUrl =
        `http://localhost:3000/reset-password/${resetToken}`;

    await sendEmail(
        user.email,
        "Reset Password",
        `
        <h1>Password Reset</h1>
        <p>Click link below</p>
        <a href="${resetUrl}">
            Reset Password
        </a>
        `
    );
};

export const resetPasswordService = async (
    token: string,
    password: string
) => {

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
            $gt: new Date(),
        },
    });

    if (!user) {
        throw new AppError(
            "Invalid or expired token",
            400
        );
    }

    user.password =
        await bcrypt.hash(password, 10);

    user.resetPasswordToken = "";
    user.resetPasswordExpires = null;

    await user.save();
};

