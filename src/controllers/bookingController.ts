import { Response, Request } from "express";
import { bookingType } from "../types/types";

import { AuthenticationRequest } from "../middlewares/authMiddleware";
import { Booking } from "../models/bookingModel";
import {
  InternalServerError500,
  NotFound404,
  Success200,
} from "../utils/responses";
import { Event } from "../models/eventModel";
import { logger } from "../utils/loggerUtils";

export const getAllBookings = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId });
    if (bookings.length === 0) {
      return NotFound404(res, "You currently  have no bookings");
    }
    return Success200(
      res,
      `You currently have ${bookings.length} Booking(s)`,
      bookings
    );
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NotFound404(res, "Booking Does not exist or no longer available");
    }
    return Success200(res, `_`, booking);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const createBooking = async (
  req: AuthenticationRequest,
  res: Response
) => {
  function calculateTotal(ticketPrice, numberOfTickets) {
    return ticketPrice * numberOfTickets;
  }
  try {
    const { event, numberOfTickets }: bookingType = req.body;
    const getEvent = await Event.findById(event);
    if (!getEvent) {
      return NotFound404(res, "Event Not Found or no longer Available");
    }

    const totalTicketPrice = calculateTotal(getEvent.price, numberOfTickets);
    const userName = req.user.name;
    const userId = req.user._id;
    // - TODO : handle duplicate booking and over booking
    const newBooking = new Booking({
      event,
      numberOfTickets,
      user: userId,
      totalPrice: totalTicketPrice,
    });
    const booking = await newBooking.save();
    // - Add user id to the event attendee array
    getEvent.attendees.push(userName);
    await getEvent.save();

    return Success200(res, "Booking created Successfully", booking);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};
