import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await prisma.productDetails.findMany();
		return NextResponse.json({ status: 200, messager: "OKE", data });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
