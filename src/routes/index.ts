import { Router } from "express";
import { AppError } from "../errors/app-error";
import authRoutes from "../modules/auth/auth.routes";
import feedbackRoutes from "../modules/feedback/feedback.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import voteRoutes from "../modules/vote/vote.routes";
import commentRoutes from "../modules/comment/comment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/feedback", voteRoutes);
router.use("/feedback", commentRoutes);

router.get("/", (_req, res) => {
    res.json({
        message: "Feedback API Running",
    });
});

router.get("/error", () => {
    throw new AppError("Something went wrong", 400);
});

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: (req as any).user,
    });
});

export default router;