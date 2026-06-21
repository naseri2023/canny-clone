import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false, // خیلی مهم: پسورد همیشه برنگرده
        },
        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);