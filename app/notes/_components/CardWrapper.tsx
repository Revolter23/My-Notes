import { Suspense } from "react";
import Card from "@/app/notes/_components/Card";
import { Note } from "@/app/_lib/definitions";
import { getNotes } from "@/app/_lib/getData";
import CardSkeleton from "@/app/notes/_components/CardSkeleton";

export default async function CardWrapper() {
	const notes = await getNotes();
	return (
		<>
			{notes.map((note: Note) => (
				<Suspense key={note.id} fallback={<CardSkeleton />}>
					<Card key={note.id} note={note} />
				</Suspense>
				// <CardSkeleton key={note.id} />
			))}
		</>
	);
}
