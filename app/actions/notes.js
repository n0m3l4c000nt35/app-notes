"use server";

import { CreateNoteFormSchema } from "@/app/lib/definitions";
import { connectDB } from "@/app/lib/db";
import Note from "../../models/Note";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createNote(prevState, formData) {
  const session = await verifySession();

  if (!session) throw Error("Forbidden");

  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = CreateNoteFormSchema.safeParse({
    title,
    content,
  });

  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

  connectDB();

  const note = await Note.create({ title, content, user: session.userId });
  if (!note) return { message: "Error saving note" };
  redirect("/notes");
}

export async function deleteNote(prevState, data) {
  const id = data.get("id");
  try {
    const noteDeleted = await Note.findOneAndDelete({ _id: id });
    if (noteDeleted) revalidatePath("/notes");
  } catch (error) {
    return { message: "Error" };
  }
}
