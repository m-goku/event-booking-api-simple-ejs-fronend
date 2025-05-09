import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { userRegistrationType, userSignInType } from "../types/types";
import { User } from "../models/authModels";
import { logger } from "../utils/loggerUtils";
import {
  InternalServerError500,
  ConflictError409,
  createdSuccess201,
  NotFound404,
  Success200,
} from "../utils/responses";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import {
  validateRegistrationInput,
  validateLoginInput,
} from "../utils/validationUtils";
import { generateToken } from "../utils/tokenUtils";

export const registerPage = async (req: Request, res: Response) => {
  try {
    res.render("auth/signUpPage");
  } catch (error) {
    logger.error(error.message);
    InternalServerError500(res, error);
  }
};

export const signInPage = async (req: Request, res: Response) => {
  try {
    res.render("auth/signInPage");
  } catch (error) {
    logger.error(error.message);
    InternalServerError500(res, error);
  }
};

export const dashboardPage = async (req: Request, res: Response) => {
  try {
    res.render("auth/dashboardPage");
  } catch (error) {
    logger.error(error.message);
    InternalServerError500(res, error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    validateRegistrationInput(req.body);
    const { name, email, password, role }: userRegistrationType = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return ConflictError409(res, "User Already Exists, try signing in");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    const user = await newUser.save();
    return createdSuccess201(res, "User Created Successfully", user);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    validateLoginInput(req.body);
    const { email, password }: userSignInType = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return NotFound404(res, "Invalid Email or Password, try again");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NotFound404(res, "Invalid Email or Password, try again");
    }

    // const token = generateToken(user._id, user.name, user.role);

    const token = generateToken(user._id, user.name, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    console.log(token);
    res.redirect("/bookings");
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};
