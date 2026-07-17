import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default async function AuthPage() {
	// Fetch session to determine auth state
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;
	const session = await decrypt(sessionCookie);
	const isLoggedIn = !!session?.userId;

	return (
		<div className="relative min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">

			{/* Sticky Header/Navbar */}
			<nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center z-50">
				<Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900">
					<MenuBookIcon className="text-emerald-500 text-3xl" />
					<span>NoteFlow</span>
				</Link>
				<div>
					{isLoggedIn ? (
						<Link href="/notes">
							<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer">
								Go to Dashboard
							</button>
						</Link>
					) : (
						<Link href="/login">
							<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer">
								Sign In
							</button>
						</Link>
					)}
				</div>
			</nav>

			{/* Combined Hero & Features Section */}
			<section className="relative w-full bg-white/20 backdrop-blur-xl border-b border-slate-200/50 overflow-hidden">
				{/* Radial glowing backgrounds behind the glass */}
				<div className="absolute inset-0 opacity-20 -z-10 pointer-events-none">
					<div className="absolute top-20 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
					<div className="absolute top-40 right-40 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
					<div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
				</div>

				{/* Hero Section */}
				<header className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-16 max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6 animate-fade-in">
						<span>✨</span> Introducing NoteFlow
					</div>

					<h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
						Capture Your <br />
						Ideas in <span className="text-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Style</span>
					</h1>

					<p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
						A beautiful, modern note-taking application designed for those who want to capture their thoughts with elegance and efficiency.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{isLoggedIn ? (
							<Link href="/notes">
								<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md flex items-center gap-2 cursor-pointer text-lg">
									Go to Dashboard
									<ArrowForwardIcon fontSize="small" />
								</button>
							</Link>
						) : (
							<>
								<Link href="/sign-up">
									<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md flex items-center gap-2 cursor-pointer text-lg">
										Sign Up
										<ArrowForwardIcon fontSize="small" />
									</button>
								</Link>
								<Link href="/login">
									<button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-3.5 rounded-full border border-slate-200 transition shadow-sm cursor-pointer text-lg">
										Sign In
									</button>
								</Link>
							</>
						)}
					</div>
				</header>

				{/* Three Feature Cards Section */}
				<div className="px-6 pb-20 max-w-6xl mx-auto w-full">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Create Card */}
						<div className="bg-white/70 backdrop-blur-md border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
							<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-5">
								<MenuBookIcon />
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-2">Create</h3>
							<p className="text-slate-500">Start writing instantly</p>
						</div>

						{/* Organize Card */}
						<div className="bg-white/70 backdrop-blur-md border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
							<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-5">
								<FlashOnIcon />
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-2">Organize</h3>
							<p className="text-slate-500">Keep everything in order</p>
						</div>

						{/* Access Card */}
						<div className="bg-white/70 backdrop-blur-md border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
							<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-5">
								<SecurityIcon />
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-2">Access</h3>
							<p className="text-slate-500">Find notes anytime</p>
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose NoteFlow Section */}
			<section className="px-6 py-20 bg-white border-t border-b border-slate-100 w-full">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
						Why Choose NoteFlow?
					</h2>
					<p className="text-lg text-slate-500 mb-16">
						Experience the future of note-taking
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
						{/* Card 1 */}
						<div className="bg-slate-50/50 border border-slate-100 p-8 rounded-2xl shadow-sm flex flex-col">
							<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
								<MenuBookIcon fontSize="small" />
							</div>
							<h4 className="text-lg font-bold text-slate-900 mb-3">Organize Your Thoughts</h4>
							<p className="text-slate-500 leading-relaxed text-sm">
								Create, edit, and organize your notes with an intuitive interface designed for absolute clarity.
							</p>
						</div>

						{/* Card 2 */}
						<div className="bg-slate-50/50 border border-slate-100 p-8 rounded-2xl shadow-sm flex flex-col">
							<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
								<FlashOnIcon fontSize="small" />
							</div>
							<h4 className="text-lg font-bold text-slate-900 mb-3">Lightning Fast</h4>
							<p className="text-slate-500 leading-relaxed text-sm">
								Instant sync and real-time updates keep your notes always accessible on any device.
							</p>
						</div>

						{/* Card 3 */}
						<div className="bg-slate-50/50 border border-slate-100 p-8 rounded-2xl shadow-sm flex flex-col">
							<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
								<SecurityIcon fontSize="small" />
							</div>
							<h4 className="text-lg font-bold text-slate-900 mb-3">Always Available</h4>
							<p className="text-slate-500 leading-relaxed text-sm">
								Access your notes anytime, anywhere securely. Your content is protected and private.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Ready to Begin Section */}
			<section className="px-6 py-24 text-center max-w-4xl mx-auto w-full">
				<h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
					Ready to Begin?
				</h2>
				<p className="text-lg text-slate-500 mb-10">
					Start capturing your thoughts today with NoteFlow
				</p>
				<div>
					{isLoggedIn ? (
						<Link href="/notes">
							<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md cursor-pointer text-lg">
								Go to Dashboard
							</button>
						</Link>
					) : (
						<Link href="/login">
							<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md cursor-pointer text-lg">
								Sign In Now
							</button>
						</Link>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-slate-900 text-slate-400 py-16 px-6 md:px-12 mt-auto border-t border-slate-800">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
					<div>
						<div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
							<MenuBookIcon className="text-emerald-500" />
							<span>NoteFlow</span>
						</div>
						<p className="text-sm text-slate-500 max-w-xs">
							Capture your ideas in style, organize your thoughts, and secure your personal notes space.
						</p>
					</div>
					<div className="flex gap-16">
						<div>
							<h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h5>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="hover:text-white transition">Features</a></li>
								<li><a href="#" className="hover:text-white transition">Pricing</a></li>
								<li><a href="#" className="hover:text-white transition">Security</a></li>
							</ul>
						</div>
						<div>
							<h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h5>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
								<li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-sm text-slate-600 text-center">
					&copy; {new Date().getFullYear()} NoteFlow. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
