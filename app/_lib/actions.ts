"use server";

import * as z from "zod";
import sql from "./db";
// import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import { headers } from "next/headers";
import bcrypt from "bcrypt";

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

// const LoginUser = UserSchema.omit({ name: true });

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
			INSERT INTO notes (title, content, date)
			VALUES (${title}, ${content}, ${date})
  		`;
	} catch (error) {
		console.error("Error creating note:", error);
		return {
			message: "Database Error: Failed to Create Note.",
		};
	}

	revalidatePath("/");
	redirect("/");
}

export async function updateNote(
	id: string,
	prevState: State,
	formData: FormData,
) {
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

	revalidatePath(`/${id}`);
	redirect(`/${id}`);
}

export async function deleteNote(id: string) {
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

	revalidatePath("/");
	redirect("/");
}

// export async function loginUser(prevState: UserState, formData: FormData) {
// 	const validation = LoginUser.safeParse({
// 		email: formData.get("email"),
// 		password: formData.get("password"),
// 	});

// 	if (!validation.success) {
// 		return {
// 			errors: validation.error.flatten().fieldErrors,
// 			message:
// 				"Missing or invalid fields. Please correct the errors and try again.",
// 		};
// 	}

// 	const { email, password } = validation.data;

// 	try {
// 		const data = await auth.api.signInEmail({
// 			body: {
// 				email,
// 				password, // required
// 				rememberMe: true,
// 				callbackURL: "/",
// 			},
// 			// This endpoint requires session cookies.
// 			headers: await headers(),
// 		});
// 		console.log(data);
// 	} catch (error) {
// 		if (error instanceof APIError) {
// 			console.log(error.message, error.status);
// 		}
// 	}
// }

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

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newuser = await sql`INSERT INTO users (name, email, password)
		VALUES (${name}, ${email}, ${hashedPassword})
		RETURNING userid
		`;

		console.log(newuser);

		if (newuser.length === 0) {
			return {
				message: "Invalid User Credentials",
			};
		}
	} catch (error) {
		if (error.code === "23505") {
			return {
				message: "Invalid User Credentials",
			};
		} else {
			console.log(error);
		}
	}

	revalidatePath("/");
}
