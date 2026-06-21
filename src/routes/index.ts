import { Router } from "express";
import { AppError } from "../errors/app-error";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        message: "Feedback API Running",
    });
});

router.get("/error", () => {
    throw new AppError("Something went wrong", 400);
});

export default router;