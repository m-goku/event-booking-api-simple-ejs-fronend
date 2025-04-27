import express from "express";
import { registerUser, signInUser } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/sign-in", signInUser);
