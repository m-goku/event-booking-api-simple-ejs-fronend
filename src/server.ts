require("dotenv").config();
import express from "express";
import expressLayout from "express-ejs-layouts";
import path from "path";
import cors from "cors";

const cookieParser = require("cookie-parser");

import { authRouter } from "./routes/authRoute";
import { bookingRouter } from "./routes/bookingRoute";
import { eventRouter } from "./routes/eventRoute";
import { connectDatabase } from "./config/database/dbConnection";
import { AuthenticateUser } from "./middlewares/authMiddleware";
import { analyticsRoute } from "./routes/analyticsRoute";

const app = express();
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: "http:localhost:3001" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/auth", authRouter);
/*
- both events and bookings route will require authentication 
*/
app.use("/events", eventRouter);
app.use("/bookings", AuthenticateUser, bookingRouter);
app.use("/analytics", analyticsRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDatabase();
});
