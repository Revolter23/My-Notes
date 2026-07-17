"use client";

import { useState } from "react";
import Link from "next/link";
import { Note } from "@/app/_lib/definitions";
import { deleteNote } from "@/app/_lib/actions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface NoteDetailCardProps {
	note: Note;
}

export default function NoteDetailCard({ note }: NoteDetailCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

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
			hours = hours ? hours : 12;
			const minStr = minutes < 10 ? "0" + minutes : minutes;
			const hourStr = hours < 10 ? "0" + hours : hours;

			return `${month} ${day}, ${hourStr}:${minStr} ${ampm}`;
		} catch (e) {
			return dateStr;
		}
	}

	const handleDelete = async () => {
		setIsDeleting(true);
		setIsModalOpen(false);
		await deleteNote(note.id);
	};

	return (
		<div className="p-8 h-full flex flex-col bg-white">
			{/* Main Detail Card */}
			<div className="flex flex-col flex-1 w-full mx-auto">
				{/* Card Header */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5 pr-14">
					<div className="flex flex-col gap-1">
						<h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
							{note.title}
						</h1>
						<div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
							<CalendarTodayIcon className="text-[14px]" />
							<span>Updated {formatDate(note.date)}</span>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Link href={`/notes/${note.id}/edit`}>
							<button className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition shadow-sm cursor-pointer">
								<EditIcon className="text-base" />
								<span>Edit</span>
							</button>
						</Link>
						<button
							onClick={() => setIsModalOpen(true)}
							disabled={isDeleting}
							className="inline-flex items-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 hover:text-red-600 text-sm font-semibold px-4 py-2 rounded-full transition cursor-pointer"
						>
							<DeleteOutlineIcon className="text-base" />
							<span>Delete</span>
						</button>
					</div>
				</div>

				{/* Note Body */}
				<div className="flex-1 overflow-y-auto pr-2 text-slate-600 text-base leading-relaxed whitespace-pre-wrap">
					{note.content}
				</div>
			</div>

			{/* Confirm Delete Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
					<div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-4 animate-scale-in">
						<h2 className="text-lg font-bold text-slate-900">Confirm Delete</h2>
						<p className="text-sm text-slate-500 leading-relaxed">
							Are you sure you want to delete this note? This action cannot be undone.
						</p>
						<div className="flex justify-end gap-3 mt-2">
							<button
								className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition cursor-pointer shadow-sm shadow-red-100"
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
