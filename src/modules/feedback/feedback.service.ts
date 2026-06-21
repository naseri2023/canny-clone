import { Feedback } from "./feedback.model";
import { AppError } from "../../errors/app-error";
import cloudinary from "../../config/cloudinary";

export const createFeedbackService = async (
    title: string,
    body: string,
    image: string | null,
    userId: string
) => {
    if (!title || !body) {
        throw new AppError("Title and body are required", 400);
    }

    const feedback = await Feedback.create({
        title,
        body,
        image,
        userId,
    });

    return feedback;
};

export const getFeedbackListService = async (query: any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";

    const filter = search
        ? { title: { $regex: search, $options: "i" } }
        : {};

    const feedbacks = await Feedback.find(filter)
        .sort({ votesCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "name email");

    const total = await Feedback.countDocuments(filter);

    return {
        data: feedbacks,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

export const uploadImageService = async (file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "feedback-images",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(file.buffer);
    });
};