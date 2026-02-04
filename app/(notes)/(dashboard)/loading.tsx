import CardSkeleton from "@/app/(notes)/_components/CardSkeleton";
import AddIconLogo from "@/app/(notes)/_components/AddIconLogo";
import Link from "next/link";

export default function Page() {
	return (
		<section className="h-full p-10">
			<div className="grid grid-cols-4 justify-items-center gap-x-4 gap-y-8">
				{Array.from({ length: 8 }).map((_, index) => (
					<CardSkeleton key={index} />
				))}
			</div>
			<Link href="/new-note">
				<AddIconLogo />
			</Link>
		</section>
	);
}
