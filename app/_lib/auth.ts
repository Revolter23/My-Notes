import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import * as z from "zod";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	return {
		adapter: PostgresAdapter(pool),
		providers: [
			Credentials({
				async authorize(credentials) {
					const parsedCredentials = z
						.object({
							name: z
								.string()
								.trim()
								.min(1, "Name is required")
								.max(100, "Name is too long"),
							email: z
								.string()
								.trim()
								.min(1, "Email is required")
								.email("Invalid email address"),
							password: z
								.string()
								.trim()
								.min(1, "Password is required")
								.min(
									8,
									"Password must be at least 8 characters",
								)
								.max(128, "Password is too long"),
						})
						.safeParse(credentials);

					if (parsedCredentials.success) {
					}
				},
			}),
		],
		pages: {
			signIn: "/authhome/login",
		},
	};
});
