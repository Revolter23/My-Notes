"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Note } from "@/app/_lib/definitions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import clsx from "clsx";

interface NotesListProps {
	notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
	const pathname = usePathname();

	function formatDate(dateStr: string) {
		try {
			const d = new Date(dateStr);
			if (isNaN(d.getTime())) return dateStr;
			
			const month = d.toLocaleDateString("en-US", { month: "short" });
			const day = d.getDate();
			
			let hours = d.getHours();
			const minutes = d.getMinutes();
			const ampm = hours >= 12 ? "PM" : "AM";
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			const minStr = minutes < 10 ? "0" + minutes : minutes;
			const hourStr = hours < 10 ? "0" + hours : hours;

			return `${month} ${day}, ${hourStr}:${minStr} ${ampm}`;
		} catch (e) {
			return dateStr;
		}
	}

	if (!notes || notes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
				<p className="text-sm">No notes available.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
			{notes.map((note) => {
				const href = `/notes/${note.id}`;
				// Check if the current note is active. We check exact match or if it's currently editing
				const isActive = pathname === href || pathname === `${href}/edit`;

				return (
					<Link key={note.id} href={href}>
						<article
							className={clsx(
								"flex flex-col gap-2.5 border-2 rounded-2xl p-5 transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md",
								isActive
									? "border-emerald-500 bg-emerald-50/30 shadow-emerald-50"
									: "border-slate-100 bg-white hover:bg-slate-50/50"
							)}
						>
							<h3 className="text-base font-bold text-slate-800 line-clamp-1">
								{note.title}
							</h3>
							<p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
								{note.content}
							</p>
							<div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
								<CalendarTodayIcon className="text-[14px]" />
								<span>{formatDate(note.date)}</span>
							</div>
						</article>
					</Link>
				);
			})}
		</div>
	);
}
