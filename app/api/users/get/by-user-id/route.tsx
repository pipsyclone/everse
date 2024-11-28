import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const userid = request.nextUrl.searchParams.get("userid") as string;

		const data = await prisma.users.findUnique({
			where: { userid },
		});

		if (!data) {
			return NextResponse.json({ status: 200, messager: "OK", data });
		}
		return NextResponse.json({
			status: 200,
			messager: "Pengguna tidak ditemukan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
