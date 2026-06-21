import bcrypt from "bcryptjs";
import { User } from "./auth.model";
import { AppError } from "../../errors/app-error";

export const signupUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};