"use client";

import { singoutHandler } from "@/app/_lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="sticky top-0 flex justify-center py-6 border-b-2 border-lime-200 bg-lime-400/90 backdrop-blur-[2px]">
			<h1 className="flex justify-between w-[80%]">
				<Link
					href={pathname.includes("/notes") ? "/notes" : "/"}
					className="text-3xl text-zinc-50 font-semibold"
				>
					My Notes
				</Link>
				<form
					action={singoutHandler}
					hidden={!pathname.includes("/notes")}
				>
					<button className="rounded-xl px-6 py-2 bg-white text-gray-600 font-semibold cursor-pointer">
						Sign Out
					</button>
				</form>
			</h1>
		</nav>
	);
}
