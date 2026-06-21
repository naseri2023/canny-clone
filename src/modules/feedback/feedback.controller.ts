import { Request, Response } from "express";
import {createFeedbackService, getFeedbackListService, uploadImageService } from "./feedback.service";

export const createFeedback = async (req: Request, res: Response) => {
    const { title, body, image } = req.body;

    const userId = (req as any).user.userId;

    const feedback = await createFeedbackService(
        title,
        body,
        image || null,
        userId
    );

    res.status(201).json({
        success: true,
        data: feedback,
    });
};

export const getFeedbackList = async (req: Request, res: Response) => {
    const result = await getFeedbackListService(req.query);

    res.json({
        success: true,
        ...result,
    });
};

export const uploadImage = async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }

    const result: any = await uploadImageService(file);

    res.json({
        success: true,
        data: {
            url: result.secure_url,
        },
    });
};