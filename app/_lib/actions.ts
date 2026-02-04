"use server";

import { z } from "zod";
import sql from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const NoteSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	content: z.string().min(1, "Content is required"),
});

const CreateNote = NoteSchema.omit({ id: true });
const UpdateNote = NoteSchema.omit({ id: true });

export type State = {
	errors?: {
		title?: string[];
		content?: string[];
	};
	message?: string | null;
};

export async function createNote(prevState: State, formData: FormData) {
	const validation = CreateNote.safeParse({
		title: formData.get("title"),
		content: formData.get("content"),
	});

	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { title, content } = validation.data;
	const date = new Date().toISOString();
	try {
		await sql`
			INSERT INTO notes (title, content, date)
			VALUES (${title}, ${content}, ${date})
  		`;
	} catch (error) {
		console.error("Error creating note:", error);
		return {
			message: "Database Error: Failed to Create Note.",
		};
	}

	revalidatePath("/");
	redirect("/");
}

export async function updateNote(
	id: string,
	prevState: State,
	formData: FormData,
) {
	const validation = UpdateNote.safeParse({
		title: formData.get("title"),
		content: formData.get("content"),
	});

	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { title, content } = validation.data;
	const date = new Date().toISOString();
	try {
		await sql`
			UPDATE notes
			SET title = ${title}, content = ${content}, date = ${date}
			WHERE id = ${id}
  		`;
	} catch (error) {
		console.error("Error updating note:", error);
		return {
			message: "Database Error: Failed to Update Note.",
		};
	}

	revalidatePath(`/${id}`);
	redirect(`/${id}`);
}

export async function deleteNote(id: string) {
	try {
		await sql`
			DELETE FROM notes
			WHERE id = ${id}
  		`;
	} catch (error) {
		console.error("Error deleting note:", error);
		return {
			message: "Database Error: Failed to Delete Note.",
		};
	}

	revalidatePath("/");
	redirect("/");
}
