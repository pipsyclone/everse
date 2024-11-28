import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const productid = request.nextUrl.searchParams.get("productid") as string;

		const data = await prisma.productDetails.findUnique({
			where: { productid },
		});
		if (!data) {
			NextResponse.json({
				status: 200,
				messager: "OK",
				data,
			});
		}
		return NextResponse.json({
			status: 203,
			messager: "Produk tidak ditemukan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
