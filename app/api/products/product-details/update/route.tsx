import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function UPDATE(request: NextRequest) {
	try {
		const body = await request.json();

		const exists = await prisma.productDetails.findUnique({
			where: { productid: body.productid },
		});

		if (!exists) {
			await prisma.productDetails.update({
				where: { productid: body.productid },
				data: {
					productcode: body.productcode,
					productname: body.productname,
					productimagesquare: "-",
					productimagelandscape: "-",
					productimageinstructions: "-",
					productinstructions: body.instructions,
				},
			});

			return NextResponse.json({
				status: 200,
				message: "Berhasil mengubah detail produk!",
			});
		}

		return NextResponse.json({
			status: 203,
			message: "Produk ini sudah dimasukkan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
