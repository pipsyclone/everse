import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function UPDATE(request: NextRequest) {
	try {
		const body = await request.json();

		const exists = await prisma.users.findUnique({
			where: { userid: body.userid },
		});

		const existsAccount = await prisma.users.findFirst({
			where: {
				OR: [
					{ username: body.username },
					{ email: body.email },
					{ nophone: body.nophone },
				],
			},
		});

		if (!exists) {
			if (
				existsAccount?.username !== body.username ||
				existsAccount?.email !== body.email ||
				existsAccount?.nophone !== body.nophone
			) {
				return NextResponse.json({
					status: 400,
					message:
						"Username / Email / Nomor Telefon yang anda masukkan sudah digunakan pengguna lain!",
				});
			}

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
				message: "Berhasil mengubah pengguna!",
			});
		}

		return NextResponse.json({
			status: 203,
			message: "Pengguna tidak ditemukan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
