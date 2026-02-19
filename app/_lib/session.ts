import "server-only";
import { EncryptJWT, SignJWT, jwtDecrypt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "@/app/_lib/definitions";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
	return new EncryptJWT(payload)
		.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.encrypt(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtDecrypt(session, encodedKey);

		if (!payload) return null;

		return payload;
	} catch (error) {
		console.error("Failed to verify session:", error);
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const session = await encrypt({ userId });

	// console.log(session);

	const cookieStore = await cookies();

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function updateSession(userId: string) {
	const checkInterval = 60 * 60 * 1000;
	const session = (await cookies()).get("session")?.value;

	if (!session) {
		await createSession(userId);
		return;
	}

	const payload: SessionPayload = await decrypt(session);

	if (!payload?.userId) {
		await deleteSession();
		await createSession(userId);
		return;
	}

	const now = Date.now();

	if (now - payload.iat! >= checkInterval) {
		const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		const updatedSession = await encrypt({
			userId,
		});

		const cookieStore = await cookies();
		cookieStore.set("session", updatedSession, {
			httpOnly: true,
			secure: true,
			expires: expires,
			sameSite: "lax",
			path: "/",
		});
	}
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
