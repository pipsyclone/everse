import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const pathname = request.nextUrl.pathname;
	const query = request.nextUrl.searchParams;

	// Jika belum login dan akses profile dan dashboard maka dialihkan ke signin
	if (
		(!token && pathname.startsWith("/customer/profile/")) ||
		(!token && pathname.startsWith("/dashboard"))
	) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	// Jika sudah login dan mengakses page auth makan akan dialihkan ke index customers
	if (
		(token && pathname.startsWith("/signin")) ||
		(token && pathname.startsWith("/signup"))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	console.log(token);
}

export const config = {
	matcher: ["/signin", "/signup", "/dashboard", "/customer/:path*"],
};
