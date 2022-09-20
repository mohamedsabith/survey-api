/* eslint-disable import/extensions */
import express from "express";
import {
  signUp,
  signIn,
  ForgotPassword,
  ResetPassword,
  getAllQuestions,
  getAllSurveys,
  selectedSurveyQuestions,
  submitSurvey,
} from "../controllers/userController.js";
import {
  adminLogin,
  createQuestions,
  createSurvey,
} from "../controllers/adminController.js";
import verifyAdminToken from "../middlewares/verifyAdminToken.js";
import verifyUserToken from "../middlewares/verifyUserToken.js";

const router = express.Router();

// user routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgotPassword", ForgotPassword);
router.post("/resetPassword", ResetPassword);
router.get("/getSurveys", verifyUserToken, getAllSurveys);
router.get("/getQuestions", verifyUserToken, getAllQuestions);
router.get("/surveyQuestions", verifyUserToken, selectedSurveyQuestions);
router.post("/submitSurvey", verifyUserToken, submitSurvey);

// admin routes
router.post("/admin/signin", adminLogin);
router.post("/createSurvey", verifyAdminToken, createSurvey);
router.post("/createQuestion", verifyAdminToken, createQuestions);

export default router;
