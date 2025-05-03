import { Response, Request } from "express";
import { eventType } from "../types/types";
import { AuthenticationRequest } from "../middlewares/authMiddleware";
import { Event } from "../models/eventModel";
import {
  createdSuccess201,
  Forbidden403,
  InternalServerError500,
  NotFound404,
  Success200,
} from "../utils/responses";
import { logger } from "../utils/loggerUtils";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("organizer", "name");
    res.render("events/allEvents");
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).populate("organizer", "name");
    if (!event) {
      return NotFound404(res, "Event With Given ID not Found");
    }
    res.render("events/singleEvent");
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const addEventPage = async (req: Request, res: Response) => {
  try {
    res.render("events/addEventPage");
  } catch (error) {
    logger.error(error.message);
    InternalServerError500(res, error);
  }
};

export const addEvent = async (req: AuthenticationRequest, res: Response) => {
  try {
    const event: eventType = req.body;
    const userId = req.user._id;
    const newEvent = new Event({
      ...event,
      organizer: userId,
      attendees: [],
    });

    const createdEvent = await newEvent.save();
    return createdSuccess201(res, "Event Created Successfully", createdEvent);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const updateEvent = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const eventUpdate = req.body;
    const eventId = req.params.id;
    const userId = req.user._id;
    const { organizer }: any = await Event.findById(eventId).populate(
      "organizer"
    );

    if (!organizer) {
      return NotFound404(res, "Organizer of this event not found");
    }
    if (!(userId.toString() === organizer._id.toString())) {
      return Forbidden403(res, "You cannot Update an Event you did't create");
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventUpdate, {
      new: true,
    });

    return Success200(res, "_", updatedEvent);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};

export const deleteEvent = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const { organizer }: any = await Event.findById(eventId).populate(
      "organizer"
    );
    if (!organizer) {
      return NotFound404(res, "Organizer of this event not found");
    }
    if (!(userId.toString() === organizer._id.toString())) {
      return Forbidden403(res, "You cannot Delete an Event you did't create");
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId, {
      new: true,
    });

    return Success200(res, "_", deletedEvent);
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
};
