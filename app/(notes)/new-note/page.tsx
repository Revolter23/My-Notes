"use client";

import { useActionState, useState } from "react";
import clsx from "clsx";
import { createNote } from "@/app/_lib/actions";

export default function Page() {
	const initialState = {
		message: "",
		errors: {},
	};
	const [state, formAction, isPending] = useActionState(
		createNote,
		initialState,
	);
	const [charCount, setCharCount] = useState(0);

	return (
		<div className="flex flex-col items-center min-h-dvh bg-gray-100 py-16">
			<div className="bg-white rounded-xl shadow-lg px-10 py-14 w-full max-w-md">
				<h1 className="text-3xl font-medium mb-6 text-gray-700">
					Create New Note
				</h1>

				<form action={formAction} className="space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Title
						</label>
						<input
							id="title"
							name="title"
							type="text"
							onChange={(e) =>
								setCharCount(e.target.value.length)
							}
							className={clsx(
								"w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition",
								state.errors?.title
									? "border-red-500 bg-red-50 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500",
							)}
							placeholder="Enter note title"
						/>
						<span className="text-sm font-semibold text-gray-500 mt-1 block">
							{charCount} / 100
						</span>
						{state.errors?.title &&
							state.errors.title.map((errorMsg: string) => (
								<p
									className="text-red-500 text-sm mt-1"
									key={errorMsg}
								>
									{errorMsg}
								</p>
							))}
					</div>

					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Content
						</label>
						<textarea
							id="content"
							name="content"
							rows={6}
							className={clsx(
								"w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition resize-none",
								state.errors?.content
									? "border-red-500 bg-red-50 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500",
							)}
							placeholder="Enter note content"
						/>
						{state.errors?.content &&
							state.errors?.content.map((errorMsg: string) => (
								<p
									className="text-red-500 text-sm mt-1"
									key={errorMsg}
								>
									{errorMsg}
								</p>
							))}
					</div>

					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-lime-400 hover:bg-lime-500 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-full transition"
					>
						{isPending ? "Creating..." : "Create Note"}
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
			</div>
		</div>
	);
}
