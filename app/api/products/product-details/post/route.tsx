import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const exists = await prisma.productDetails.findUnique({
			where: { productcode: body.productcode },
		});

		if (!exists) {
			await prisma.productDetails.create({
				data: {
					userid: body.userid,
					productcode: body.productcode,
					productname: body.productname,
					productimagesquare: "-",
					productinstructions: body.instructions,
				},
			});

			return NextResponse.json({
				status: 200,
				message: "Berhasil menambahkan detail produk!",
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
