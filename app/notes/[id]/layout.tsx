"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PexelImage from "@/public/pexels-image.jpg";
import Breadcrumbs from "@/app/notes/[id]/_components/breadcrumbs";
import { deleteNote } from "@/app/_lib/actions";

export default function IdLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const params = useParams();
	const id = params.id!.toString();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const breadcrumbs = [
		{ label: "Notes", href: "/" },
		{
			label: "View Note",
			href: `/notes/${id}`,
			active: pathname.endsWith(`/${id}`),
		},
		...(pathname.endsWith("/edit")
			? [{ label: "Edit Note", href: `/notes/${id}/edit`, active: true }]
			: []),
	];

	const handleDelete = async () => {
		// Logic to delete the note
		setIsModalOpen(false);
		await deleteNote(id);
	};

	return (
		<div className="flex justify-center  bg-gray-200 h-full pt-4 pb-10">
			<div className="flex flex-col w-[60%] gap-6">
				<div className="flex justify-between items-center">
					<Breadcrumbs breadcrumbs={breadcrumbs} />
					<div className="flex gap-4">
						<Link href={`/notes/${id}/edit`}>
							<button
								className={clsx(
									"bg-white text-black px-5 py-2 rounded-lg cursor-pointer",
									pathname.endsWith("/edit") && "hidden",
								)}
							>
								Edit
							</button>
						</Link>
						<button
							className={clsx(
								"bg-red-500 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer",
								pathname.endsWith("/edit") && "hidden",
							)}
							onClick={() => setIsModalOpen(true)}
						>
							Delete
						</button>
					</div>
				</div>
				<article className="bg-white h-full min-h-160 rounded-lg overflow-hidden">
					<Image
						src={PexelImage}
						alt="Note Icon"
						className="h-80 object-cover"
					/>
					<div className="flex flex-col px-8 py-10 gap-6">
						{children}
					</div>
				</article>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
					<div className="bg-white p-6 rounded shadow-lg w-96">
						<h2 className="text-lg font-bold mb-4">
							Confirm Delete
						</h2>
						<p className="mb-6">
							Are you sure you want to delete this note?
						</p>
						<div className="flex justify-end gap-4">
							<button
								className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
