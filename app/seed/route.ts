import postgres from "postgres";
import { notes } from "@/app/_lib/note-data";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedNotes() {
	const session = (await cookies()).get("session")?.value;
	const payload = await decrypt(session);

	const insertedNotes = await Promise.all(
		notes.map(
			(note) => sql`
	    INSERT INTO notes (title, content, date, userid)
	    VALUES (${note.title}, ${note.content}, ${note.date}, ${payload!.userId as string})
	    ON CONFLICT (id) DO NOTHING;
	  `,
		),
	);

	return insertedNotes;
}

async function userTables() {
	const result = await sql.file("./app/seed/query.sql");

	return result;
}

export async function GET() {
	try {
		const data = await seedNotes();

		return Response.json({ message: "Database seeded successfully", data });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
