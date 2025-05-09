import express from "express";
import {
  registerUser,
  signInUser,
  registerPage,
  signInPage,
  dashboardPage,
} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/sign-in", signInUser);
authRouter.get("/register", registerPage);
authRouter.get("/sign-in", signInPage);
authRouter.get("/dashboard", dashboardPage);
