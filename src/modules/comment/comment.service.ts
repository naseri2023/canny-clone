import { Comment } from "./comment.model";
import { Feedback } from "../feedback/feedback.model";
import { AppError } from "../../errors/app-error";

export const createCommentService = async (
    userId: string,
    feedbackId: string,
    text: string
) => {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
        throw new AppError("Feedback not found", 404);
    }

    const comment = await Comment.create({
        userId,
        feedbackId,
        text,
    });

    return comment;
};

export const getCommentsByFeedbackService = async (feedbackId: string) => {
    const comments = await Comment.find({ feedbackId })
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

    return comments;
};
