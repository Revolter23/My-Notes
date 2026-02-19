"use server";

import * as z from "zod";
import sql from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { User } from "@/app/_lib/definitions";
import {
	createSession,
	deleteSession,
	updateSession,
} from "@/app/_lib/session";
import { verifySession } from "@/app/_lib/dal";

const NoteSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	content: z.string().min(1, "Content is required"),
});

const UserSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(100, "Name is too long"),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, "Email is required")
		.email("Invalid email address"),
	password: z
		.string()
		.trim()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.max(128, "Password is too long"),
});

const LoginUser = UserSchema.omit({ name: true });

const CreateNote = NoteSchema.omit({ id: true });
const UpdateNote = NoteSchema.omit({ id: true });

export type SignUpState = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export type UserState = {
	errors?: {
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export type State = {
	errors?: {
		title?: string[];
		content?: string[];
	};
	message?: string | null;
};

export async function createNote(prevState: State, formData: FormData) {
	const session = await verifySession();
	if (!session) return null;

	const validation = CreateNote.safeParse({
		title: formData.get("title"),
		content: formData.get("content"),
	});

	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { title, content } = validation.data;
	const date = new Date().toISOString();
	try {
		await sql`
			INSERT INTO notes (title, content, date, userid)
			VALUES (${title}, ${content}, ${date}, ${session.userId})
  		`;
	} catch (error) {
		console.error("Error creating note:", error);
		return {
			message: "Database Error: Failed to Create Note.",
		};
	}

	revalidatePath("/notes");
	redirect("/notes");
}

export async function updateNote(
	id: string,
	prevState: State,
	formData: FormData,
) {
	const session = await verifySession();
	if (!session) return null;

	const validation = UpdateNote.safeParse({
		title: formData.get("title"),
		content: formData.get("content"),
	});

	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { title, content } = validation.data;
	const date = new Date().toISOString();
	try {
		await sql`
			UPDATE notes
			SET title = ${title}, content = ${content}, date = ${date}
			WHERE id = ${id}
  		`;
	} catch (error) {
		console.error("Error updating note:", error);
		return {
			message: "Database Error: Failed to Update Note.",
		};
	}

	revalidatePath(`/notes/${id}`);
	redirect(`/notes/${id}`);
}

export async function deleteNote(id: string) {
	const session = await verifySession();
	if (!session) return null;

	try {
		await sql`
			DELETE FROM notes
			WHERE id = ${id}
  		`;
	} catch (error) {
		console.error("Error deleting note:", error);
		return {
			message: "Database Error: Failed to Delete Note.",
		};
	}

	revalidatePath("/notes");
	redirect("/notes");
}

export async function signupUser(prevState: SignUpState, formData: FormData) {
	const validation = UserSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { name, email, password } = validation.data;
	let redirectPath: string | null = null;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newuser = await sql`INSERT INTO users (name, email, password)
		VALUES (${name}, ${email}, ${hashedPassword})
		RETURNING userid
		`;

		if (newuser.length === 0) {
			return {
				message: "Invalid User Credentials",
			};
		}

		await createSession(newuser[0].userid);
		redirectPath = "/notes";
	} catch (error) {
		if (error.code === "23505") {
			return {
				message: "Invalid User Credentials",
			};
		} else {
			console.error(error);
		}
	} finally {
		if (redirectPath) {
			revalidatePath("/notes");
			redirect(redirectPath);
		}
	}
}

async function getUser(email: string) {
	try {
		const user = await sql<
			User[]
		>`SELECT * FROM users WHERE email = ${email}`;
		return user[0];
	} catch (error) {
		console.error(error);
	}
}

export async function authenticate(prevState: UserState, formData: FormData) {
	const parsedCredentials = LoginUser.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parsedCredentials.success) {
		return {
			errors: parsedCredentials.error.flatten().fieldErrors,
			message:
				"Missing or invalid fields. Please correct the errors and try again.",
		};
	}

	const { email, password } = parsedCredentials.data;
	let redirectPath: string | null = null;

	try {
		const user = await getUser(email);
		// console.log(user);

		if (!user) {
			const e = new Error("Invalid Credentials");
			e.name = "AuthError";
			throw e;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			const e = new Error("Invalid Credentials");
			e.name = "AuthError";
			throw e;
		}

		await updateSession(user.userid);
		redirectPath = "/notes";
	} catch (error) {
		if ((error.name = "AuthError")) {
			switch (error.name) {
				case "AuthError":
					return { message: "Invalid credentials." };
				default:
					return { message: "Something went wrong." };
			}
		} else {
			console.error(error);
		}
	} finally {
		if (redirectPath) {
			revalidatePath("/notes");
			redirect(redirectPath);
		}
	}
}

export async function singoutHandler() {
	await deleteSession();
	redirect("/");
}
