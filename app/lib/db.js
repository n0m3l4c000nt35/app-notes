import mongoose from "mongoose";
import Notes from "@/models/Note";
import { verifySession } from "./dal";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    if (conn.STATES.connected !== 1) throw new Error("Connect DB error");
  } catch (error) {
    return { message: "Database error" };
  }
};

export const getNotes = async () => {
  const { userId } = await verifySession();

  try {
    connectDB();
    return Notes.find({ user: userId });
  } catch (error) {
    return { message: "Error trying fetching notes" };
  }
};
