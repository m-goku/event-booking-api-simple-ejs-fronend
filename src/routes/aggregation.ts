// const revenuePerOrganizer = await Booking.aggregate([
//   // Step 1: Join Event
//   {
//     $lookup: {
//       from: "events",
//       localField: "event",
//       foreignField: "_id",
//       as: "eventDetails",
//     },
//   },
//   // Step 2: Flatten eventDetails
//   { $unwind: "$eventDetails" },

//   // Step 3: Only keep bookings for events organized by the current user
//   {
//     $match: {
//       "eventDetails.organizer": new mongoose.Types.ObjectId(req.user.id),
//     },
//   },

//   // Step 4: Group the data
//   {
//     $group: {
//       _id: "$eventDetails.organizer",
//       totalRevenue: { $sum: "$totalPrice" },
//       totalTicketsSold: { $sum: "$numberOfTickets" },
//     },
//   },

//   // Step 5: Lookup organizer details
//   {
//     $lookup: {
//       from: "users",
//       localField: "_id",
//       foreignField: "_id",
//       as: "organizerDetails",
//     },
//   },
//   { $unwind: "$organizerDetails" },

//   // Step 6: Project only the fields you want
//   {
//     $project: {
//       organizerName: "$organizerDetails.name",
//       email: "$organizerDetails.email",
//       totalRevenue: 1,
//       totalTicketsSold: 1,
//     },
//   },
// ]);
