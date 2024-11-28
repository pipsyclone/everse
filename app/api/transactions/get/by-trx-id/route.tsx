import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const trxid = request.nextUrl.searchParams.get("trxid") as string;

		const data = await prisma.transactions.findUnique({ where: { trxid } });
		if (!data) {
			return NextResponse.json({ status: 200, messager: "OK", data });
		}

		return NextResponse.json({
			status: 203,
			messager: "Transaksi tidak ditemukan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
