"use client";
import { useEffect } from "react";
import { getDetailTransaction } from "@/utils/custom-swr";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormatRupiah } from "@arismun/format-rupiah";
import Card from "../../ui/card";
import Scripts from "@/utils/scripts";
import { QRCodeSVG } from "qrcode.react";
import Loading from "@/components/ui/loading";

const Invoice = () => {
	const router = useRouter();
	const query = useSearchParams();
	const { detailtrx, detailtrxLoading } = getDetailTransaction(
		query.get("tripay_reference") as string
	);
	const { countdown } = Scripts();
	useEffect(() => {
		if (detailtrx?.expired_time) {
			countdown(detailtrx.expired_time, "countdown");
		}
		console.log(router);
	}, [detailtrx?.expired_time]);

	if (detailtrxLoading) return <Loading />;

	return (
		<>
			<Card className="bg-slate-900 rounded-lg absolute max-h-[600px] overflow-auto custom-scroll transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[450px]">
				<button
					type="button"
					onClick={() => router.back()}
					className="absolute top-0 left-0 text-slate-500 p-3 text-2xl"
				>
					<i className="fa-solid fa-arrow-left"></i>
				</button>

				<div className="text-center text-6xl mb-5">
					{detailtrx.status === "UNPAID" ? (
						<i className="fa-solid fa-warning text-yellow-500"></i>
					) : detailtrx.status === "PAID" ? (
						<i className="fa-solid fa-circle-check text-green-500"></i>
					) : detailtrx.status === "REFUND" ? (
						<i className="fa-solid fa-arrows-rotate text-sky-500"></i>
					) : detailtrx.status === "EXPIRED" ? (
						<i className="fa-solid fa-hourglass-half text-red-500"></i>
					) : (
						<i className="fa-solid fa-circle-xmark text-red-500"></i>
					)}
				</div>
				<hr />
				{detailtrx.status === "UNPAID" && detailtrx.payment_name === "QRIS" ? (
					<QRCodeSVG
						id="qrcodeimage"
						value={detailtrx.qr_string}
						size={220}
						level={"H"}
						includeMargin={true}
						marginSize={1}
						className="mx-auto mt-5"
					/>
				) : (
					""
				)}
				<div className="mt-5 text-sm">
					<pre>
						<div className="flex justify-between items-center">
							Transaction Detail
							{detailtrx.status === "UNPAID" ? (
								<span
									id="countdown"
									className="bg-red-500 rounded-s-full rounded-e-full p-1 text-xs"
								>
									Memuat...
								</span>
							) : detailtrx.status === "PAID" ? (
								<span className="bg-green-500 rounded-s-full rounded-e-full p-1 text-xs">
									Pembayaran Berhasil!
								</span>
							) : detailtrx.status === "REFUND" ? (
								<span className="bg-green-500 rounded-s-full rounded-e-full p-1 text-xs">
									Pembayaran Dikembalikan!
								</span>
							) : detailtrx.status === "EXPIRED" ? (
								<span className="bg-red-500 rounded-s-full rounded-e-full p-1 text-xs">
									Transaksi Kadaluarsa!
								</span>
							) : (
								<span className="bg-red-500 rounded-s-full rounded-e-full p-1 text-xs">
									Transaksi Gagal!
								</span>
							)}
						</div>
						<br />
						<br />
						<div className="flex flex-col gap-3">
							<div className="flex justify-between items-center">
								<div className="grow">
									{detailtrx.order_items[0].name}
									<br />
									{detailtrx.order_items[0].quantity}x
								</div>
								<FormatRupiah value={detailtrx.order_items[0].price} />
							</div>
							<div className="flex justify-between items-center">
								<div>Biaya Layanan</div>
								<FormatRupiah value={detailtrx.total_fee} />
							</div>
							<hr />
							<div className="flex justify-between items-center">
								<div>Total</div>
								<FormatRupiah value={detailtrx.amount} />
							</div>
						</div>
					</pre>
					<div>
						{detailtrx.status === "UNPAID" &&
						detailtrx.payment_name !== "QRIS" ? (
							<a
								href={detailtrx.checkout_url}
								target="_blank"
								className="block p-2 bg-slate-900 hover:bg-sky-500 rounded-s-full rounded-e-full border border-sky-500 text-sky-500 hover:text-white text-center mt-5 duration-500 ease-in-out"
							>
								Lanjutkan Pembayaran
							</a>
						) : (
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="w-full p-2 bg-slate-900 hover:bg-sky-500 rounded-s-full rounded-e-full border border-sky-500 text-sky-500 hover:text-white text-center mt-5 duration-500 ease-in-out"
							>
								Refresh
							</button>
						)}
					</div>
					<div>
						{detailtrx.instructions.map((data: any, key: number) => {
							return (
								<div key={key}>
									<hr className="mt-5 mb-5" />
									<div>
										<p>{data.title}</p>
										<ul style={{ listStyle: "number" }} className="p-3">
											{data?.steps?.map((step: any, keystep: number) => {
												return <li key={keystep}>{step}</li>;
											})}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Card>
		</>
	);
};

export default Invoice;
