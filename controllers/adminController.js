/* eslint-disable import/extensions */
import chalk from "chalk";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import surveyModel from "../models/surveyModel.js";
import questionModel from "../models/questionModel.js";
import adminModel from "../models/adminModel.js";

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin)
      return res.status(400).json({
        status: false,
        error:
          "The email you entered doesn't belong to an account. Please check your email and try again.",
      });

    const comparePassword = await bcrypt.compare(password, admin.password);

    if (!comparePassword)
      return res.status(400).json({
        status: false,
        error:
          "Your password was incorrect. Please double-check your password.",
      });
    const token = await Jwt.sign(
      { username: admin.email, id: admin._id },
      process.env.JWT_ADMIN_SECRET_KEY,
      { expiresIn: "30d" }
    );
    return res.status(200).json({
      status: "ok",
      msg: "Login success.",
      token,
      username: admin.email,
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(404).json(error);
  }
};

// CREATING NEW SURVEY
const createSurvey = async (req, res) => {
  try {
    const { survey } = req.body;

    if (!survey) {
      return res.status(400).json({
        status: false,
        error: "Fields should be required.",
      });
    }
    // checking survey already exist
    const surveyExist = await surveyModel.findOne({ survey });

    if (surveyExist) {
      return res.status(400).json({
        status: false,
        error: "Survey already exist.",
      });
    }

    // saving to DB
    const newSurvey = new surveyModel({
      survey: survey,
    });

    await newSurvey.save((err) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ status: false, error: err.message });
      }
      console.log(chalk.green("New Survey Created Successfully"));
      return res.status(200).json({
        status: true,
        message: "New Survey Created Successfully",
      });
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(404).json(error);
  }
};

// CREATE NEW QUESTIONS AND OPTIONS
const createQuestions = async (req, res) => {
  try {
    console.log(req.body);
    const { question, option1, option2, option3, option4, survey } = req.body;

    if (!question || !option1 || !option2 || !option3 || !option4 || !survey) {
      return res.status(400).json({
        status: false,
        error: "Fields should be required.",
      });
    }

    // checking question exist
    const Question = await questionModel.findOne({ question });

    if (Question) {
      return res.status(400).json({
        status: false,
        error: "Question already exist.",
      });
    }

    const Survey = await surveyModel.findOne({ survey });

    if (!survey) {
      return res.status(400).json({
        status: false,
        error: "Survey not found",
      });
    }

    const options = [option1, option2, option3, option4];

    // saving to DB
    const newQuestion = new questionModel({
      question: question,
      options: options,
      survey: Survey._id,
    });

    await newQuestion.save((err) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ status: false, error: err.message });
      }
      console.log(chalk.green("New Question Created Successfully"));
      return res.status(200).json({
        status: true,
        message: "New Question Created Successfully",
      });
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(404).json(error);
  }
};

export { createSurvey, createQuestions, adminLogin };
