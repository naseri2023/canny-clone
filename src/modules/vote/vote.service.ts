import { Vote } from "./vote.model";
import { Feedback } from "../feedback/feedback.model";
import { AppError } from "../../errors/app-error";

export const toggleVoteService = async (
    userId: string,
    feedbackId: string
) => {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
        throw new AppError("Feedback not found", 404);
    }

    const existingVote = await Vote.findOne({
        userId,
        feedbackId,
    });

    // اگر vote وجود داشت → حذف (unvote)
    if (existingVote) {
        await existingVote.deleteOne();

        await Feedback.findByIdAndUpdate(feedbackId, {
            $inc: { votesCount: -1 },
        });

        return { voted: false };
    }

    // اگر vote وجود نداشت → ایجاد
    await Vote.create({
        userId,
        feedbackId,
    });

    await Feedback.findByIdAndUpdate(feedbackId, {
        $inc: { votesCount: 1 },
    });

    return { voted: true };
};