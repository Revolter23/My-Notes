import Navbar from "@/app/(notes)/_components/Navbar";
import Footer from "@/app/(notes)/_components/Footer";

export default function AuthLayout({
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
