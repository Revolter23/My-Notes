import { getNotes } from "@/app/_lib/getData";
import { verifySession } from "@/app/_lib/dal";
import NotesLayoutClient from "@/app/notes/_components/NotesLayoutClient";

export default async function NotesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await verifySession();
	if (!session) return null;

	const notes = (await getNotes()) || [];

	return (
		<NotesLayoutClient notes={notes}>
			{children}
		</NotesLayoutClient>
	);
}
