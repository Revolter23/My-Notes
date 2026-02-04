import Navbar from "@/app/(notes)/_components/Navbar";
import Footer from "./_components/Footer";

export default function NotesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main className="min-h-dvh">{children}</main>
			<Footer />
		</>
	);
}
