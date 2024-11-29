import { NextResponse } from "next/server";
import axios from "axios";
import md5 from "md5";

const formatString = (input) => {
	return input ? input.toLowerCase().replace(/ /g, "_") : input?.toLowerCase();
};

export async function GET(request) {
	try {
		const gamename = request.nextUrl.searchParams.get("gamename");

		const username = process.env.NEXT_PUBLIC_IAK_USERNAME || "";
		const apikey = process.env.NEXT_PUBLIC_IAK_APIKEY;
		const sign = md5(username + apikey + "pl");

		const response = await axios.post(
			process.env.NEXT_PUBLIC_IAK_BASEURL +
				`/api/pricelist/game/${formatString(gamename)}`,
			{
				username,
				sign,
				status: "active",
			}
		);

		if (response.data.data.rc === "00") {
			return NextResponse.json({
				status: 200,
				message: "OK",
				data: response.data.data.pricelist,
			});
		}

		return NextResponse.json({
			status: response.data.data.rc,
			message: response.data.data.message,
			data: null,
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err.message,
		});
	}
}
