/* eslint-disable import/extensions */
import express from "express";
import {
  signUp,
  signIn,
  ForgotPassword,
  ResetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgotPassword", ForgotPassword);
router.post("/resetPassword", ResetPassword);

export default router;
