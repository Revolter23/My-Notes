import sql from "@/app/_lib/db";
import { Note, User } from "./definitions";
import { verifySession } from "@/app/_lib/dal";

export async function getNotes() {
	const session = await verifySession();
	if (!session) return null;

	try {
		const notes = await sql<
			Note[]
		>`SELECT * FROM notes WHERE userid = ${session.userId as string} ORDER BY date DESC`;
		return notes;
	} catch (error) {
		console.error("Error fetching notes:", error);
		throw new Error("Failed to fetch notes");
	}
}

export async function getNotebyId(id: string) {
	const session = await verifySession();
	if (!session) return null;

	try {
		const note = await sql<Note[]>`SELECT * FROM notes WHERE id = ${id}`;
		// console.log(note[0].title);
		return note[0];
	} catch (error) {
		console.error("Error fetching note by ID:", error);
		throw new Error("Failed to fetch note by ID");
	}
}

export async function getUserName(id: string) {
	try {
		const user = await sql`SELECT name FROM users WHERE userid = ${id}`;
		return user[0];
	} catch (error) {
		console.error("Error fetching user name:", error);
		throw new Error("Failed to fetch user name");
	}
}
