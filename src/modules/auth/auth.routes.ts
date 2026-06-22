import { Router } from "express";
import { signup, signin, forgotPassword, resetPassword, } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { signupSchema, signinSchema } from "./auth.validation";

const router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/signup", validate(signupSchema), signup);


/**
 * @openapi
 * /auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
router.post("/signin", validate(signinSchema), signin);

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send password reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: zahra@test.com
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post(
    "/forgot-password",
    forgotPassword
);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated
 */
router.post(
    "/reset-password",
    resetPassword
);

export default router;