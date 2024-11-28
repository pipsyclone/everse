import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const apikey = process.env.NEXT_PUBLIC_TRIPAY_APIKEY;

		const response = await axios.get(
			process.env.NEXT_PUBLIC_TRIPAY_BASEURL + "/merchant/payment-channel",
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
	} catch (err: unknown) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
