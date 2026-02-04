import CardWrapper from "@/app/(notes)/_components/CardWrapper";
import AddIconLogo from "@/app/(notes)/_components/AddIconLogo";
import Link from "next/link";

export default function Page() {
	return (
		<section className="h-full p-10">
			{/* <h1 className="text-2xl font-semibold text-lime-500">
				View your notes here
			</h1> */}
			<div className="grid grid-cols-4 justify-items-center gap-x-4 gap-y-8">
				<CardWrapper />
			</div>
			<Link href="/new-note">
				<AddIconLogo />
			</Link>
		</section>
	);
}
