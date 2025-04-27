import { Router } from "express";
import {
  mostPopular,
  eventRevenue,
  topThreeCategories,
} from "../controllers/analyticsController";

export const analyticsRoute = Router();

analyticsRoute.get("/event-revenue/:id", eventRevenue); //organizer
analyticsRoute.get("/most-popular", mostPopular); // all
analyticsRoute.get("/top-three-categories", topThreeCategories); //all
