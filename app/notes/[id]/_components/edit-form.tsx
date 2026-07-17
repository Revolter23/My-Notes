"use client";

import { Note } from "@/app/_lib/definitions";
import { clsx } from "clsx";
import { useActionState } from "react";
import { updateNote, State } from "@/app/_lib/actions";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditForm({ note }: { note: Note }) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction, isPending] = useActionState(
		(async (prevState: any, formData: FormData) => {
			return updateNote(note.id, prevState, formData);
		}) as any,
		initialState,
	);

	return (
		<div className="p-8 h-full flex flex-col bg-white">
			<div className="flex flex-col flex-1 w-full mx-auto">
				{/* Header */}
				<div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6 pr-14">
					<Link href={`/notes/${note.id}`} className="text-slate-400 hover:text-slate-600 transition">
						<ArrowBackIcon fontSize="small" />
					</Link>
					<h1 className="text-xl font-bold text-slate-900">
						Edit Note
					</h1>
				</div>

				<form action={formAction} className="flex flex-col flex-1 gap-5">
					{/* Title */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="title" className="text-sm font-semibold text-slate-700">
							Title
						</label>
						<input
							id="title"
							name="title"
							type="text"
							maxLength={100}
							className={clsx(
								"w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-800 font-semibold",
								state.errors?.title && "border-red-500 focus:ring-red-500/25 focus:border-red-500"
							)}
							defaultValue={note.title}
							placeholder="Enter note title"
							required
						/>
						{state.errors?.title &&
							state.errors.title.map((errorMsg: string) => (
								<p className="text-red-500 text-xs font-semibold mt-1" key={errorMsg}>
									{errorMsg}
								</p>
							))}
					</div>

					{/* Content */}
					<div className="flex flex-col flex-1 gap-1.5 min-h-[250px]">
						<label htmlFor="content" className="text-sm font-semibold text-slate-700">
							Content
						</label>
						<textarea
							id="content"
							name="content"
							className={clsx(
								"w-full flex-1 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-600 resize-none leading-relaxed",
								state.errors?.content && "border-red-500 focus:ring-red-500/25 focus:border-red-500"
							)}
							defaultValue={note.content}
							placeholder="Enter note content..."
							required
						/>
						{state.errors?.content &&
							state.errors?.content.map((errorMsg: string) => (
								<p className="text-red-500 text-xs font-semibold mt-1" key={errorMsg}>
									{errorMsg}
								</p>
							))}
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
						<Link href={`/notes/${note.id}`}>
							<button
								type="button"
								className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
							>
								Cancel
							</button>
						</Link>
						<button
							type="submit"
							disabled={isPending}
							className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer"
						>
							{isPending ? "Updating..." : "Update Note"}
						</button>
					</div>

					{state.message && (
						<p
							className="text-red-500 text-sm text-center font-semibold bg-red-50 p-2.5 rounded-xl"
							key={state.message}
						>
							{state.message}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
