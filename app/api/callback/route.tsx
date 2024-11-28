import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import md5 from "md5";

export async function POST(request: NextRequest) {
	try {
		// Mendapatkan body request dari Tripay
		const body = await request.json();
		const { reference, merchant_ref, status } = body;

		const tripay_apikey = process.env.NEXT_PUBLIC_TRIPAY_APIKEY;
		const iak_apikey = process.env.NEXT_PUBLIC_IAK_APIKEY;
		const username = process.env.NEXT_PUBLIC_IAK_USERNAME || "";

		// Proses sesuai status pembayaran
		if (status === "PAID") {
			const paymentDetailResponse = await axios.get(
				`${process.env.NEXT_PUBLIC_TRIPAY_BASEURL}/transaction/detail?reference=${reference}`,
				{
					headers: {
						Authorization: `Bearer ${tripay_apikey}`,
					},
				}
			);

			await axios.post(process.env.NEXT_PUBLIC_IAK_BASEURL + "/api/top-up", {
				username,
				customer_id: paymentDetailResponse.data.data.customer_name,
				ref_id: paymentDetailResponse.data.data.merchant_ref,
				product_code: paymentDetailResponse.data.data.order_items[0].sku,
				sign: md5(
					username + iak_apikey + paymentDetailResponse.data.data.merchant_ref
				),
			});

			return NextResponse.json(body);
		}

		const paymentCheckStatus = await axios.get(
			`${process.env.NEXT_PUBLIC_TRIPAY_BASEURL}/transaction/cehck-status?reference=${reference}`,
			{
				headers: {
					Authorization: `Bearer ${tripay_apikey}`,
				},
			}
		);

		// Jika pembayaran gagal
		if (status === "REFUND") {
			return NextResponse.json({
				status: 400,
				status_payment: "REFUND",
				message: paymentCheckStatus.data.data.message,
			});
		}

		// Jika pembayaran gagal
		if (status === "EXPIRED") {
			return NextResponse.json({
				status: 400,
				status_payment: "EXPIRED",
				message: paymentCheckStatus.data.data.message,
			});
		}

		// Jika pembayaran gagal
		if (status === "FAILED") {
			return NextResponse.json({
				status: 400,
				status_payment: "FAILED",
				message: paymentCheckStatus.data.data.message,
			});
		}

		return NextResponse.json({
			status: 400,
			message: "Invalid status",
		});
	} catch (err) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
