import { Router } from "express";
import { AppError } from "../errors/app-error";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (_req, res) => {
    res.json({
        message: "Feedback API Running",
    });
});

router.get("/error", () => {
    throw new AppError("Something went wrong", 400);
});

export default router;