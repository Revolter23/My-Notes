import type { JwtPayload } from "jsonwebtoken";

export type Note = {
	id: string;
	userid: string;
	title: string;
	content: string;
	date: string;
};

export type User = {
	userid: string;
	name: string;
	email: string;
	password: string;
};

export interface SessionPayload extends JwtPayload {
	userId: string;
}
