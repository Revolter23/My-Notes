"use client";

import { authenticate } from "@/app/_lib/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function LoginPage() {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	}

	const initialState = { errors: { email: [], password: [] }, message: "" };
	const [state, formAction, isPending] = useActionState(
		authenticate,
		initialState,
	);
	return (
		<div className="flex flex-col min-h-150 w-full items-center justify-center p-10">
			<div className="w-[90%] max-w-md border border-gray-700 bg-white text-black rounded-xl px-10 py-20">
				<h1 className="text-2xl mb-4">Login</h1>
				<form action={formAction} className="flex flex-col gap-4">
					<label className="flex flex-col">
						<span>Email</span>
						<input
							name="email"
							type="email"
							className="mt-1 py-2 px-4 rounded-xl border border-gray-600"
							placeholder="Enter Email Address"
							value={userData.email}
							onChange={handleChange}
						/>
						{state?.errors?.email &&
							state.errors.email.map((errorMsg: string) => (
								<p
									className="text-red-500 text-sm mt-1"
									key={errorMsg}
								>
									{errorMsg}
								</p>
							))}
					</label>

					<label className="flex flex-col">
						<span>Password</span>
						<input
							name="password"
							type="password"
							className="mt-1 py-2 px-4 rounded-xl border border-gray-600"
							placeholder="Enter your Password"
							value={userData.password}
							onChange={handleChange}
						/>
						{state?.errors?.password &&
							state.errors.password.map((errorMsg: string) => (
								<p
									className="text-red-500 text-sm mt-1"
									key={errorMsg}
								>
									{errorMsg}
								</p>
							))}
					</label>

					<button
						type="submit"
						disabled={isPending}
						className="bg-black text-white py-2 rounded-xl mt-6"
					>
						{isPending ? "Logging in..." : "Login"}
					</button>
				</form>

				<div className="mt-8 text-sm">
					<Link href="/" className="text-gray-600">
						Back
					</Link>
				</div>
				{state?.message && (
					<div className="mt-4 text-red-500">{state.message}</div>
				)}
			</div>
		</div>
	);
}
