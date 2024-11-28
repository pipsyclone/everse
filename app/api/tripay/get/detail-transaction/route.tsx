import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
	try {
		const reference = request.nextUrl.searchParams.get("reference");
		const apikey = process.env.NEXT_PUBLIC_TRIPAY_APIKEY;

		const response = await axios.get(
			process.env.NEXT_PUBLIC_TRIPAY_BASEURL +
				"/transaction/detail?reference=" +
				reference,
			{
				headers: {
					Authorization: `Bearer ${apikey}`,
				},
			}
		);

		if (response.data.success) {
			return NextResponse.json({
				status: 200,
				message: "OK",
				data: response.data.data,
			});
		}

		return NextResponse.json({
			status: 400,
			message: response.data.message,
			data: null,
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
