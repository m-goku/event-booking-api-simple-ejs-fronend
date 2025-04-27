import express from "express";

import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/eventController";
import {
  RoleAuthorization,
  AuthenticateUser,
} from "../middlewares/authMiddleware";
export const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEvent);
/*
- post, update, delate routes need role authorization of "Organizer" after authentication 
*/
eventRouter.post("/add", AuthenticateUser, RoleAuthorization, addEvent);
eventRouter.put(
  "/update/:id",
  AuthenticateUser,
  RoleAuthorization,
  updateEvent
);
eventRouter.delete(
  "/remove/:id",
  AuthenticateUser,
  RoleAuthorization,
  deleteEvent
);
