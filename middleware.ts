import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Protect all routes under /dashboard and /api/subscribe
	if (
		(req.nextUrl.pathname.startsWith("/dashboard") ||
			req.nextUrl.pathname.startsWith("/api/subscribe")) &&
		!session
	) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return res;
}

export const config = {
	matcher: ["/dashboard/:path*", "/api/subscribe/:path*"],
};
