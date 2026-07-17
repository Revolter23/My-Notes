"use client";

import { loginAuth, UserState } from "@/app/_lib/actions";
import Link from "next/link";
import { useActionState, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoginPage() {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	}

	const initialState: UserState = { errors: {}, message: "" };
	const [state, formAction, isPending] = useActionState(loginAuth, initialState);

	return (
		<div className="relative min-h-screen bg-slate-50/50 text-slate-800 flex flex-col items-center justify-center p-6 font-sans">
			{/* Radial glowing backgrounds */}
			<div className="absolute top-0 inset-x-0 h-[600px] overflow-hidden -z-10 pointer-events-none">
				<div className="absolute -top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-3xl" />
				<div className="absolute -bottom-40 right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-100/20 blur-3xl" />
			</div>

			{/* Back button top left-ish */}
			<div className="w-full max-w-md mb-8 flex justify-start">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
				>
					<ArrowBackIcon fontSize="small" />
					<span>Back</span>
				</Link>
			</div>

			<div className="w-full max-w-md flex flex-col items-center text-center">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
					<MenuBookIcon className="text-emerald-500 text-3xl" />
					<span>NoteFlow</span>
				</Link>

				<h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
				<p className="text-slate-500 text-sm mb-8">Sign in to continue to your notes</p>

				{/* Card */}
				<div className="w-full bg-white border border-slate-100/80 rounded-3xl p-8 shadow-md">
					<form action={formAction} className="flex flex-col gap-5 text-left">
						{/* Email */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="email" className="text-sm font-semibold text-slate-700">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								className="py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
								placeholder="you@example.com"
								value={userData.email}
								onChange={handleChange}
								required
							/>
							{state?.errors?.email &&
								state.errors.email.map((errorMsg: string) => (
									<p className="text-red-500 text-xs mt-1 font-medium" key={errorMsg}>
										{errorMsg}
									</p>
								))}
						</div>

						{/* Password */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="password" className="text-sm font-semibold text-slate-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								className="py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
								placeholder="........"
								value={userData.password}
								onChange={handleChange}
								required
							/>
							{state?.errors?.password &&
								state.errors.password.map((errorMsg: string) => (
									<p className="text-red-500 text-xs mt-1 font-medium" key={errorMsg}>
										{errorMsg}
									</p>
								))}
						</div>

						{/* Sign In Button */}
						<button
							type="submit"
							disabled={isPending}
							className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-semibold py-3 rounded-full mt-2 transition shadow-sm cursor-pointer"
						>
							{isPending ? "Signing in..." : "Sign In"}
						</button>
					</form>

					{/* OR Separator */}
					<div className="relative flex items-center justify-center my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-slate-100"></div>
						</div>
						<span className="relative px-3 bg-white text-xs text-slate-400 font-medium">or</span>
					</div>

					{/* Create Account Link Styled as Button */}
					<Link href="/sign-up">
						<button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-full border border-slate-200 transition shadow-sm cursor-pointer">
							Create New Account
						</button>
					</Link>

					{state?.message && (
						<div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium">
							{state.message}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
