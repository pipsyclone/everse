import { NextResponse } from "next/server";
import axios from "axios";
import md5 from "md5";

export async function GET() {
	try {
		const username = process.env.NEXT_PUBLIC_IAK_USERNAME || "";
		const apikey = process.env.NEXT_PUBLIC_IAK_APIKEY;
		const sign = md5(username + apikey + "gc");

		const response = await axios.post(
			process.env.NEXT_PUBLIC_IAK_BASEURL + "/api/gamelist",
			{
				username,
				sign,
			}
		);

		if (response.data.data.rc === "00") {
			return NextResponse.json({
				status: 200,
				message: "OK",
				data: response.data.data.gamelist,
			});
		}

		return NextResponse.json({
			status: response.data.data.rc,
			message: response.data.data.message,
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err.message,
		});
	}
}
