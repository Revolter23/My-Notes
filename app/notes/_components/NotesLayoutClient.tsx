"use client";

import { useState, useEffect } from "react";
import { Note } from "@/app/_lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotesList from "./NotesList";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { singoutHandler } from "@/app/_lib/actions";
import clsx from "clsx";

interface NotesLayoutClientProps {
	notes: Note[];
	children: React.ReactNode;
}

export default function NotesLayoutClient({
	notes,
	children,
}: NotesLayoutClientProps) {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768; // standard md breakpoint
			setIsMobile(mobile);
			if (mobile) {
				setIsSidebarOpen(false); // closed by default on mobile/small screens
			} else {
				setIsSidebarOpen(true); // open by default on tablet and larger
			}
		};

		handleResize(); // run initially
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Open the side panel if we're on any sub-route of /notes (e.g. edit, details, new)
	const isSidePanelOpen = pathname !== "/notes";

	return (
		<div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans relative">
			{/* Mobile Sidebar Overlay Backdrop */}
			{isSidebarOpen && isMobile && (
				<div
					className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40 md:hidden transition-opacity"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Column 1: Left Sidebar */}
			<aside
				className={clsx(
					"bg-white flex flex-col justify-between flex-shrink-0 transition-all duration-300 ease-in-out border-r",
					// Mobile vs Desktop styling
					isMobile ? "fixed inset-y-0 left-0 z-50 shadow-2xl h-full" : "relative",
					isSidebarOpen ? "w-64 border-slate-200" : "w-0 overflow-hidden border-transparent"
				)}
			>
				{/* Inner fixed-width container to prevent shifting or wrapping during collapse */}
				<div className="w-64 h-full flex flex-col justify-between flex-shrink-0">
					<div className="flex flex-col">
						{/* Logo and Collapse icon (inside sidebar for desktop) */}
						<div className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-slate-100">
							<Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
								<MenuBookIcon className="text-emerald-500" />
								<span>NoteFlow</span>
							</Link>
							{/* Collapse sidebar button (only on desktop when open) */}
							{!isMobile && (
								<button
									onClick={() => setIsSidebarOpen(false)}
									className="p-1 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition cursor-pointer"
									title="Collapse sidebar"
								>
									<ChevronLeftIcon fontSize="small" />
								</button>
							)}
						</div>

						{/* Navigation Menu */}
						<nav className="p-4 flex flex-col gap-1.5">
							<Link
								href="/notes"
								className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-semibold transition"
							>
								<DescriptionIcon fontSize="small" />
								<span>All Notes</span>
							</Link>
						</nav>
					</div>

					{/* Sign Out Button */}
					<div className="p-4 border-t border-slate-100">
						<form action={singoutHandler}>
							<button
								type="submit"
								className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
							>
								<ExitToAppIcon fontSize="small" />
								<span>Sign Out</span>
							</button>
						</form>
					</div>
				</div>
			</aside>

			{/* Main Content Pane */}
			<div className="flex-1 flex flex-col relative overflow-hidden h-full">
				{/* Header */}
				<header className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-slate-200 bg-white flex-shrink-0 gap-4">
					<div className="flex items-center gap-3">
						{/* Hamburger or Expand Toggle Button (visible if closed, or always on mobile) */}
						{(!isSidebarOpen || isMobile) && (
							<button
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
								className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition cursor-pointer"
								title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
							>
								<MenuIcon />
							</button>
						)}
						<h2 className="text-xl font-bold text-slate-900">My Notes</h2>
					</div>
					<Link href="/notes/new-note">
						<button
							title="Create New Note"
							className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-sm flex items-center gap-1.5 cursor-pointer"
						>
							<AddIcon fontSize="small" />
							<span>New Note</span>
						</button>
					</Link>
				</header>

				{/* Notes Grid Area */}
				<div className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
					<NotesList notes={notes} />
				</div>

				{/* Overlapping Side Panel */}
				{isSidePanelOpen && (
					<>
						{/* Backdrop for click-to-close */}
						<Link
							href="/notes"
							className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] z-40 transition-opacity"
							aria-label="Close panel"
						/>

						{/* Side Panel */}
						<div className="absolute top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] border-l border-slate-200 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
							{/* Close button */}
							<div className="absolute top-5 right-5 z-[60]">
								<Link href="/notes">
									<button
										type="button"
										title="Close panel"
										className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition cursor-pointer shadow-sm"
									>
										<CloseIcon fontSize="small" />
									</button>
								</Link>
							</div>

							{/* Content Area */}
							<div className="flex-1 overflow-y-auto h-full">
								{children}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
