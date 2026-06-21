import { Router } from "express";
import { toggleVote } from "./vote.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/:id/vote", authMiddleware, toggleVote);

export default router;