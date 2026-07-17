import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/session";

const protectedRoutes = ["/notes"];
const publicRoutes = ["/login", "/sign-up", "/"];

export default async function proxy(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);
	const session = (await cookies()).get("session")?.value;
	const payload = await decrypt(session);
	if (isProtectedRoute && !payload?.userId) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
