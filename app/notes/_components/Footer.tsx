export default function Footer() {
	return (
		<footer className="flex justify-around bg-gray-700 text-zinc-50 h-50 px-14 py-10 gap-10">
			<div>
				<h1 className="text-2xl font-bold mb-2">My Notes App</h1>
				<p className="text-sm">
					© 2024 My Notes App. All rights reserved.
				</p>
			</div>
			<div>
				<h2 className="mb-2">About Us</h2>
				<h2 className="mb-2">Privacy Policy</h2>
				<h2 className="mb-2">Terms of Service</h2>
			</div>
			<div>
				<h2 className="font-semibold mb-2">Contact Us</h2>
			</div>
		</footer>
	);
}
