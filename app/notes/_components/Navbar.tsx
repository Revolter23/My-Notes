"use client";

import { singoutHandler } from "@/app/_lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="sticky top-0 flex justify-center py-6 border-b-2 border-lime-200 bg-lime-400/90 backdrop-blur-[2px]">
			<h1 className="flex justify-between w-[90%]">
				<Link
					href={pathname.includes("/notes") ? "/notes" : "/"}
					className="text-3xl text-zinc-50 font-semibold"
				>
					My Notes
				</Link>
				<div className="flex items-center gap-10">
					<form
						action={singoutHandler}
						hidden={!pathname.includes("/notes")}
					>
						<button className="rounded-xl px-6 py-2 bg-white text-gray-600 font-semibold cursor-pointer">
							Sign Out
						</button>
					</form>
					<Link href="/notes">
						<PersonIcon
							className="box-content p-2 bg-white rounded-full hover:shadow-lg transition-shadow duration-200"
							// fontSize="large"
						/>
					</Link>
				</div>
			</h1>
		</nav>
	);
}
