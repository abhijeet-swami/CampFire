import {
  register,
  verifyCode,
  resendCode,
  login,
  forgotPassword,
  logout,
} from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  registrationSchema,
  loginSchema,
  otpSchema,
} from "../utils/validate.util.js";

import express from "express";

const router = express.Router();

router.post("/register", validate(registrationSchema), register);
router.post("/verify-otp", validate(otpSchema), verifyCode);
router.get("/resend-otp", validate(otpSchema), resendCode);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(otpSchema), forgotPassword);
router.post("/logout", validateUser, logout);

export default router;
