import express from "express";

import {
  createBooking,
  getAllBookings,
  getBooking,
} from "../controllers/bookingController";

export const bookingRouter = express.Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/:id", getBooking);
bookingRouter.post("/create", createBooking);
