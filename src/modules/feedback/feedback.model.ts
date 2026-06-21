import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        body: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: null,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        votesCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);