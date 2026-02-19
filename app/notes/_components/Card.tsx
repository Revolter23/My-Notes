import { Note } from "@/app/_lib/definitions";
import Link from "next/link";

export default function Card({ note }: { note: Note }) {
	return (
		<Link href={`notes/${note.id}`}>
			<article className="flex flex-col gap-3 border border-gray-400 rounded-lg p-4 h-32 w-full hover:shadow-lg transition-shadow duration-200">
				<h2 className="text-lg font-medium text-gray-500">
					{note.title}
				</h2>
				<p className="text-base text-gray-400 line-clamp-2">
					{note.content}
				</p>
			</article>
		</Link>
	);
}
