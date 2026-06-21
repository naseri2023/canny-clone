import { z } from "zod";

export const createFeedbackSchema = z.object({
    title: z.string().min(3),
    body: z.string().min(5),
    image: z.string().url().optional(),
});