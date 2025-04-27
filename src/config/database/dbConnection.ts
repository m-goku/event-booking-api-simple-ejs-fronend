require("dotenv").config();
import mongoose from "mongoose";
import { logger } from "../../utils/loggerUtils";

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    logger.info(
      `Database Connected Successfully at ${conn.connections[0].host}`
    );
  } catch (error) {
    logger.error(error.message);
  }
};
