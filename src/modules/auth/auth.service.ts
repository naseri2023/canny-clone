import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { AppError } from "../../errors/app-error";

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
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
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