import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const productid = request.nextUrl.searchParams.get("productid") as string;

		await prisma.productDetails.deleteMany({ where: { productid } });
		return NextResponse.json({
			status: 200,
			messager: "Berhasil menghapus produk!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
