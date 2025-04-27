import mongoose, { Schema } from "mongoose";

import { bookingType } from "../types/types";

// - Create Booking Schema
const bookingSchema = new Schema<bookingType>(
  {
    event: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    numberOfTickets: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
