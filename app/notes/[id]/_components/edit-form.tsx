"use client";

import { Note } from "@/app/_lib/definitions";
import { clsx } from "clsx";
import { useActionState } from "react";
import { updateNote, State } from "@/app/_lib/actions";

export default function EditForm({ note }: { note: Note }) {
	const initialState: State = { message: null, errors: {} };
	const updateNoteById = updateNote.bind(null, note.id);
	const [state, formAction, isPending] = useActionState(
		updateNoteById,
		initialState,
	);
	return (
		<form action={formAction} className="flex flex-col gap-10">
			<div className="w-full">
				<input
					id="title"
					name="title"
					type="text"
					className={clsx(
						"w-full text-4xl border-b-2 focus:outline-none transition duration-300",
						state.errors?.title
							? "border-red-500 bg-red-50 focus:border-red-600"
							: "border-gray-300 focus:border-gray-600",
					)}
					defaultValue={note.title}
					placeholder="Enter note title"
				/>
				{state.errors?.title &&
					state.errors.title.map((errorMsg: string) => (
						<p className="text-red-500 text-sm mt-1" key={errorMsg}>
							{errorMsg}
						</p>
					))}
			</div>
			<div className="w-full">
				<textarea
					id="content"
					name="content"
					className={clsx(
						"w-full text-lg text-gray-400 border-b-2 focus:outline-none transition duration-300",
						state.errors?.content
							? "border-red-500 bg-red-50 focus:border-red-600"
							: "border-gray-300 focus:border-gray-600",
					)}
					defaultValue={note.content}
					placeholder="Enter note content"
				/>
				{state.errors?.content &&
					state.errors?.content.map((errorMsg: string) => (
						<p className="text-red-500 text-sm mt-1" key={errorMsg}>
							{errorMsg}
						</p>
					))}
			</div>
			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-lime-400 hover:bg-lime-500 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-full transition"
			>
				{isPending ? "Updating..." : "Update Note"}
			</button>

			{state.message && (
				<p
					className="text-red-500 text-sm text-center"
					key={state.message}
				>
					{state.message}
				</p>
			)}
		</form>
	);
}
