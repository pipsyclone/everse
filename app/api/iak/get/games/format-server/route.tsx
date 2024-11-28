import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import md5 from "md5";

export async function GET(request: NextRequest) {
	try {
		const gamecode = Number(request.nextUrl.searchParams.get("gamecode"));

		const username = process.env.NEXT_PUBLIC_IAK_USERNAME || "";
		const apikey = process.env.NEXT_PUBLIC_IAK_APIKEY;

		const sign = md5(username + apikey + "bl");
		const response = await axios.post(
			process.env.NEXT_PUBLIC_IAK_BASEURL + "/api/game/format",
			{
				username,
				game_code: gamecode,
				sign,
			}
		);

		const signServer = md5(username + apikey + gamecode);
		const responseServer = await axios.post(
			process.env.NEXT_PUBLIC_IAK_BASEURL + "/api/inquiry-game-server",
			{
				username,
				game_code: gamecode,
				sign,
			}
		);

		if (response.data.data.rc === "00") {
			return NextResponse.json({
				status: 200,
				message: "OK",
				data: {
					format: response.data.data.formatGameId,
					servers: responseServer.data.data.servers,
				},
			});
		}

		return NextResponse.json({
			status: Number(response.data.data.rc),
			message: response.data.data.message,
			data: null,
		});
	} catch (err: unknown) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
