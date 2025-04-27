require("dotenv").config();
import JWT from "jsonwebtoken";
import { logger } from "./loggerUtils";

export const generateToken = (id: any, name: string, role: string) => {
  let token: string;
  if (process.env.APP_KEY) {
    const generateToken = JWT.sign(
      { _id: id, name: name, role: role },
      process.env.APP_KEY
    );
    token = generateToken;
  } else {
    logger.error("Token Generation Key Missing");
  }
  return token;
};

export const verifyToken = (token) => {
  return JWT.verify(token, process.env.APP_KEY);
};
