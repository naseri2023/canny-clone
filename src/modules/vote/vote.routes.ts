import { Router } from "express";
import { toggleVote } from "./vote.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /feedback/{id}/vote:
 *   post:
 *     tags:
 *       - Votes
 *     summary: Toggle vote on a feedback
 *     description: If the user hasn't voted, it adds a vote. If already voted, it removes it (no duplicate votes).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Vote toggled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Feedback not found
 */
router.post("/:id/vote", authMiddleware, toggleVote);

export default router;