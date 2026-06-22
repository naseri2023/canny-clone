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
 *     summary: Create feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dark Mode
 *               body:
 *                 type: string
 *                 example: Please add dark mode feature
 *               image:
 *                 type: string
 *                 example: https://example.com/image.png
 *     responses:
 *       201:
 *         description: Feedback created
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