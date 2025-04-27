import mongoose from "mongoose";

import { userRegistrationType, role } from "../types/types";

// - Create User Schema
const userSchema = new mongoose.Schema<userRegistrationType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
