import { Request, Response } from "express";

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

/**
 * Registers a new user in the system.
 * This function performs the following steps:
 * - Validates the registration input.
 * - Checks if a user with the provided email already exists in the database.
 * - Hashes the user's password for secure storage.
 * - Creates a new user and saves it to the database.
 * - Sends a success response if the user is created successfully.
 *
 * - {ConflictError409} If a user with the provided email already exists.
 * - {InternalServerError500} If an unexpected error occurs during the process.
 */

export const registerUser = async (req: Request, res: Response) => {
  try {
    validateRegistrationInput(req.body);
    const { name, email, password, role }: userRegistrationType = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      ConflictError409(res, "User Already Exists, try signing in");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    const user = await newUser.save();
    createdSuccess201(res, "User Created Successfully", user);
  } catch (error) {
    logger.error(error.message);
    InternalServerError500(res, error);
  }
};

/**
 * Authenticates a user and generates a token for session management.
 * This function performs the following steps:
 * - Validates the login input.
 * - Checks if a user with the provided email exists in the database.
 * - Verifies the provided password against the stored hashed password.
 * - Generates a JWT token for the authenticated user.
 * - Sends the token in the response header and a success response.
 *
 * - {NotFound404} If the email or password is invalid.
 * - {InternalServerError500} If an unexpected error occurs during the process.
 */

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

    const token = generateToken(user._id, user.name, user.role);
    res.header({ token });
    return Success200(res, "User Logged in", token);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};
