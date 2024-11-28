import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await prisma.users.deleteMany({
			where: { role: { contains: "CUSTOMER" } },
		});
		return NextResponse.json({
			status: 200,
			messager: "Berhasil reset pengguna!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
