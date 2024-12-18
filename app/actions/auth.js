"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/app/lib/session";
import { SignupFormSchema, LoginFormSchema } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import User from "../../models/User";

export async function signupUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = SignupFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

  connectDB();

  try {
    const user = await User.findOne({ email });
    if (user) return { message: "User already registered" };
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userCreated = await User.create({ email, password: hashedPassword });
    if (!userCreated) throw new Error("Error trying register user");
  } catch (error) {
    return { message: error.message };
  }
  redirect("/login");
}

export const loginUser = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) return { message: "Invalid credentials" };

  connectDB();

  const user = await User.findOne({ email });
  if (!user) return { message: "Invalid credentials" };
  const hashCompared = await bcrypt.compare(password, user.password);
  if (!hashCompared) return { message: "Invalid credentials" };
  await createSession(user._id);
  redirect("/notes");
};

export async function logoutUser() {
  await deleteSession();
  redirect("/login");
}
