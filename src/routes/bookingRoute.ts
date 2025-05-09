import express from "express";

import {
  createBooking,
  getAllBookings,
  getBooking,
  addBookingPage,
} from "../controllers/bookingController";

export const bookingRouter = express.Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/create", addBookingPage);
bookingRouter.get("/:id", getBooking);
bookingRouter.post("/create", createBooking);
