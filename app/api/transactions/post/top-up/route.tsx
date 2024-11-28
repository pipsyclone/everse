import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Apikey
		const tripay_apikey = process.env.NEXT_PUBLIC_TRIPAY_APIKEY;
		const tripay_merchantid = process.env.NEXT_PUBLIC_TRIPAY_MERCHANTID;
		const tripay_privatekey = process.env.NEXT_PUBLIC_TRIPAY_PRIVATEKEY || "";

		// Body
		const refid = uuidv4();
		const productcode = body.product.code;
		const productname = body.product.name;
		const totalamount = body.product.price;
		const customername = body.customerName;
		const customeremail = body.customerEmail;
		const customerphone = body.customerPhone;
		const paymentmethod = body.paymentMethod;

		// Tripay Options
		const signature = crypto
			.createHmac("sha256", tripay_privatekey)
			.update(tripay_merchantid + refid + totalamount)
			.digest("hex");

		const createTripayPayment = await axios.post(
			process.env.NEXT_PUBLIC_TRIPAY_BASEURL + "/transaction/create",
			{
				method: paymentmethod,
				merchant_ref: refid,
				amount: totalamount,
				customer_name: customername,
				customer_email: customeremail,
				customer_phone: customerphone,
				return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment`,
				order_items: [
					{
						sku: productcode,
						name: productname,
						price: totalamount,
						quantity: 1,
					},
				],
				signature,
			},
			{
				headers: {
					Authorization: `Bearer ${tripay_apikey}`,
				},
			}
		);

		// Respond with success
		return NextResponse.json({
			status: 200,
			message: "OK",
			reference: createTripayPayment.data.data.reference,
		});
	} catch (err: unknown) {
		return NextResponse.json({
			status: 500,
			message: err instanceof Error ? err.message : "Unknown Error!",
		});
	}
}
