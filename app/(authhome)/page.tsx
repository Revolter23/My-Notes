import Link from "next/link";

export default function AuthPage() {
	return (
		<div className="flex flex-col min-h-150 w-full items-center justify-center">
			<div className="w-[80%] border border-gray-900 rounded-xl bg-gray-800 flex items-center text-white p-10 gap-4">
				<article className="h-full flex flex-col gap-4 basis-2/3 border-r border-white">
					<h1>Welcome to the Notes App</h1>
					<p>
						Your personal space to create and manage notes securely.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Laborum fugit ea laudantium veniam quasi ipsa, voluptas
						itaque, deleniti ad enim nostrum! Eveniet, porro
						repellat. Odio rerum nemo molestias optio dolores!
					</p>
				</article>
				<div className="flex flex-col gap-4 basis-1/3">
					<h1>Please log in or sign up to continue.</h1>
					<p>If you already have an account, please log in.</p>
					<Link href="/login">
						<button className="bg-white text-black px-4 py-2 rounded-xl cursor-pointer">
							Login
						</button>
					</Link>
					<p>
						If you are new here, please sign up to create an
						account.
					</p>
					<Link href="/sign-up">
						<button className="bg-white text-black px-4 py-2 rounded-xl cursor-pointer">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
