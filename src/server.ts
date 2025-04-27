require("dotenv").config();
import express from "express";

import { authRouter } from "./routes/authRoute";
import { bookingRouter } from "./routes/bookingRoute";
import { eventRouter } from "./routes/eventRoute";
import { connectDatabase } from "./config/database/dbConnection";
import { AuthenticateUser } from "./middlewares/authMiddleware";
import { analyticsRoute } from "./routes/analyticsRoute";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

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
