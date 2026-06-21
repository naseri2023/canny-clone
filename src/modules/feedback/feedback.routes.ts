import { Router } from "express";
import {createFeedback, getFeedbackList, uploadImage } from "./feedback.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../utils/upload";
import {createFeedbackSchema} from "./validation";
import {validate} from "../../middlewares/validate";

const router = Router();

/**
 * @openapi
 * /feedback:
 *   post:
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     summary: Create feedback
 */
router.post("/", authMiddleware, validate(createFeedbackSchema), createFeedback);


/**
 * @openapi
 * /feedback:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Get all feedbacks
 */
router.get("/", getFeedbackList);
router.post(
    "/upload",
    authMiddleware,
    upload.single("image"),
    uploadImage
);

export default router;