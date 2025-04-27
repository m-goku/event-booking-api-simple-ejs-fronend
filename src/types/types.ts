import { Schema } from "mongoose";

export enum role {
  Organizer = "Organizer",
  Attendee = "Attendee",
}

export enum category {
  Arts = "Arts",
  Music = "Music",
  Education = "Education",
  Business = "Business",
  Health = "Health",
  Sports = "Sports",
  Community = "Community",
  Gaming = "Gaming",
  Party = "Party",
  Technology = "Technology",
}

export interface userRegistrationType {
  name: string;
  email: string;
  password: string;
  role: role;
}

export interface userSignInType {
  email: string;
  password: string;
}

export interface eventType {
  title: string;
  description: string;
  date: Date;
  category: category;
  image: string;
  price: number;
  capacity: number;
  organizer: Schema.Types.ObjectId;
  attendees: string[];
}

export interface bookingType {
  event: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  numberOfTickets: number;
  totalPrice: number;
}
