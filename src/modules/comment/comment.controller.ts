import { Request, Response } from "express";
import { createCommentService, getCommentsByFeedbackService } from "./comment.service";

export const createComment = async (req: any, res: Response) => {
    const userId = req.user.userId;
    const feedbackId = req.params.id;
    const { text } = req.body;

    const comment = await createCommentService(userId, feedbackId, text);

    res.json({
        success: true,
        data: comment,
    });
};

export const getComments = async (req: Request, res: Response) => {
    const feedbackId = req.params.id as string;

    const comments = await getCommentsByFeedbackService(feedbackId);

    res.json({
        success: true,
        data: comments,
    });
};
