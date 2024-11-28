import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const userid = request.nextUrl.searchParams.get("userid") as string;

		await prisma.productDetails.deleteMany({ where: { userid } });
		return NextResponse.json({
			status: 200,
			messager: "Berhasil reset produk pada akun ini!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
