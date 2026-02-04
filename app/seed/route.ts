import postgres from "postgres";
import { notes } from "../_lib/note-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedNotes() {
	await sql`
    CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL
    );
  `;

	const insertedNotes = await Promise.all(
		notes.map(
			(note) => sql`
        INSERT INTO notes (title, content, date)
        VALUES (${note.title}, ${note.content}, ${note.date})
        ON CONFLICT (id) DO NOTHING;
      `,
		),
	);

	return insertedNotes;
}

export async function GET() {
	try {
		await seedNotes();

		return Response.json({ message: "Database seeded successfully" });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
