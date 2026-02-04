import sql from "@/app/_lib/db";
import { Note } from "./definitions";

export async function getNotes() {
	try {
		const notes = await sql<Note[]>`SELECT * FROM notes ORDER BY date DESC`;
		return notes;
	} catch (error) {
		console.error("Error fetching notes:", error);
		throw new Error("Failed to fetch notes");
	}
}

export async function getNotebyId(id: string) {
	try {
		const note = await sql<Note[]>`SELECT * FROM notes WHERE id = ${id}`;
		// console.log(note[0].title);
		return note[0];
	} catch (error) {
		console.error("Error fetching note by ID:", error);
		throw new Error("Failed to fetch note by ID");
	}
}
