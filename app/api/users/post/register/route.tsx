import { prisma } from "@/libs/prisma";
import md5 from "md5";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const exists = await prisma.users.findFirst({
			where: {
				OR: [
					{ username: body.username },
					{ email: body.email },
					{ nophone: body.nophone },
				],
			},
		});

		if (!exists) {
			await prisma.users.create({
				data: {
					providerid: md5(new Date().toISOString()),
					provider: "Credentials",
					name: body.name,
					username: body.username,
					email: body.email,
					nophone: body.nophone,
					password: md5(body.password),
				},
			});

			return NextResponse.json({
				status: 200,
				message: "Berhasil membuat akun!",
			});
		}

		return NextResponse.json({
			status: 400,
			message:
				"Username / Email / Nomor Telefon yang anda masukkan sudah digunakan!",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
