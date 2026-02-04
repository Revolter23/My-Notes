import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="sticky top-0 flex justify-center py-6 border-b-2 border-lime-200 bg-lime-400/90 backdrop-blur-[2px]">
			<h1 className=" w-[80%] text-3xl text-zinc-50 font-semibold">
				<Link href="/">My Notes</Link>
			</h1>
		</nav>
	);
}
