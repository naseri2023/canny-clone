import { Router } from "express";
import { createComment, getComments  } from "./comment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /feedback/{id}/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a comment to a feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: I agree with this feedback!
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/:id/comments", authMiddleware, createComment);


/**
 * @openapi
 * /feedback/{id}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments for a feedback
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Feedback not found
 */
router.get("/:id/comments", getComments);

export default router;
