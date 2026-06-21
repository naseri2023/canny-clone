import { Router } from "express";
import { createComment, getComments  } from "./comment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/:id/comments", authMiddleware, createComment);
router.get("/:id/comments", getComments);

export default router;