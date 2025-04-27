import mongoose, { Schema } from "mongoose";

import { eventType, category } from "../types/types";

// - Create Event Schema
const eventSchema = new Schema<eventType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: category,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
