import CardWrapper from "@/app/notes/_components/CardWrapper";
import AddIconLogo from "@/app/notes/_components/AddIconLogo";
import { verifySession } from "@/app/_lib/dal";
import Link from "next/link";
import { getUserName } from "@/app/_lib/getData";

export default async function Page() {
	const session = await verifySession();
	if (!session) return null;

	const { name } = await getUserName(session.userId);

	return (
		<section className="h-full p-10">
			<h1 className="text-4xl font-semibold text-lime-500 pb-10">
				Welcome, {name}. Your Notes are ready.
			</h1>
			<div className="grid grid-cols-4 justify-items-center gap-x-4 gap-y-8">
				<CardWrapper />
			</div>
			<Link href="notes/new-note">
				<AddIconLogo />
			</Link>
		</section>
	);
}
