import { Request, Response } from "express";
import {toggleVoteService} from "./vote.service";

export const toggleVote = async (req: any, res: Response) => {
    const userId = req.user.userId;
    const feedbackId = req.params.id;

    const result = await toggleVoteService(userId, feedbackId);

    res.json({
        success: true,
        data: result,
    });
};