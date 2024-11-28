import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const productname = request.nextUrl.searchParams
			.get("query")
			?.toLowerCase() as string;

		const data = await prisma.productDetails.findMany({
			where: { productname: productname.toLowerCase() },
		});
		if (data.length > 0) {
			return NextResponse.json({ status: 200, messager: "OKE", data });
		}
		return NextResponse.json({
			status: 404,
			messager: "Tidak ditemukan!",
			data: [],
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
