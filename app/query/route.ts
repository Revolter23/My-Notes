import sql from "../_lib/db.js";

async function listNotes() {
	const data = await sql`
    SELECT * FROM notes ORDER BY date DESC
  `;

	return data;
}

export async function GET() {
	try {
		return Response.json(await listNotes());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
