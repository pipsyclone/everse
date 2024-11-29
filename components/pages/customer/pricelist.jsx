"use client";
import {
	getGameFormat,
	getGamePricelist,
	getPaymentChannel,
	productImages,
} from "@/styles/custom-swr";
import { useParams } from "next/navigation";
import { FormatRupiah } from "@arismun/format-rupiah";
import Card from "../../ui/card";
import Middle from "../../ui/middle";
import Image from "next/image";
import Loading from "@/components/ui/loading";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Scripts from "@/utils/scripts";

const PriceList = () => {
	const params = useParams();
	const { pricelist, pricelistLoading } = getGamePricelist(params.gamename);
	const { dataFormatServers, gameFormat, gameServer, gameformatserverLoading } =
		getGameFormat(params.gamecode);
	const { GameDataList } = productImages(params.gamecode);
	const { paymentchannel, paymentchannelLoading } = getPaymentChannel();

	const { status } = useSession();
	const { Alert } = Scripts();
	const [topupIsLoading, setTopupIsLoading] = useState(false);

	const [userid1, setUserid1] = useState("");
	const [userid2, setUserid2] = useState("");
	const [userid3, setUserid3] = useState("");
	const [product, setProduct] = useState({
		code: "",
		name: "",
		price: 0,
	});
	const [customerPhone] = useState("085155467817");
	const [customerEmail] = useState("apip@mail.com");
	const [paymentMethod, setPaymentMethod] = useState("");

	const handleChangeProduct = (code, name, price) => {
		setProduct({
			code,
			name,
			price,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setTopupIsLoading(true);
		if (product.code === "" || product.name === "" || product.price === 0) {
			Alert(
				"warning",
				"Form Error!",
				"Silahkan pilih item game anda sebelum checkout!"
			);
			setTopupIsLoading(false);
		} else if (paymentMethod === "") {
			Alert(
				"warning",
				"Form Error!",
				"Silahkan pilih metode pembayaran terlebih dahulu!"
			);
			setTopupIsLoading(false);
		} else if (status !== "authenticated") {
			window.location.href = "/signin";
			setTopupIsLoading(false);
		} else {
			await axios
				.post("/api/transactions/post/top-up", {
					product,
					customerName: userid1 + userid2 + userid3,
					customerEmail,
					customerPhone,
					paymentMethod,
				})
				.then((res) => {
					if (res.data.status === 200) {
						window.location.href =
							"/payment?ripay_reference=" + res.data.reference;
						setUserid1("");
						setUserid2("");
						setUserid3("");
						setProduct({
							code: "",
							name: "",
							price: 0,
						});
						setPaymentMethod("");
					} else {
						Alert("error", "Server Error!", res.data.message);
					}
					setTopupIsLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setTopupIsLoading(false);
				});
		}
	};

	if (
		pricelistLoading ||
		gameformatserverLoading ||
		paymentchannelLoading ||
		topupIsLoading
	)
		return <Loading />;

	if (
		pricelist === null ||
		dataFormatServers === null ||
		paymentchannel === null
	)
		return (
			<Middle>
				Layanan Top Up Tidak Tersedia!
				<br />
				<a
					href="/#"
					className="w-fit mx-auto block bg-sky-500 hover:shadow-lg hover:shadow-sky-500 text-white mt-5 p-3 rounded-lg duration-500 ease-in-out"
				>
					Kembali
				</a>
			</Middle>
		);

	return (
		<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-5">
			<Card className="bg-slate-900 w-full sm:w-[500px] self-start">
				<Image
					src={"/product-images/" + GameDataList?.image}
					alt={GameDataList?.productname}
					width={1000}
					height={1000}
					className="w-[300px] h-auto mx-auto"
				/>
				<div className="mt-5">
					<p className="text-2xl italic font-bold mb-5">
						{pricelist[0]?.product_description}
					</p>
					<p className="text-sm text-justify">
						Everse menawarkan top up {GameDataList?.productname} yang mudah,
						aman, dan instan. Pembayaran tersedia melalui QRIS, OVO, DANA,
						ShopeePay Top up {GameDataList?.productname} Diamond, Twilight Pass,
						Weekly Diamond Pass (WDP), dan Starlight hanya dalam hitungan detik!
						Cukup masukkan User {gameFormat} {GameDataList?.productname} Anda,
						pilih jumlah Diamond yang Anda inginkan, selesaikan pembayaran, dan
						Diamond akan secara langsung ditambahkan ke akun{" "}
						{GameDataList?.productname} Anda.
					</p>
				</div>
			</Card>
			<div className="flex flex-col gap-5 grow">
				<Card className="bg-slate-900">
					{gameFormat === null ? (
						"Provider Closed"
					) : gameFormat === "[userid]|[zoneid]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Userid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
								(
								<input
									type="text"
									placeholder={
										"Masukkan Zoneid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid2}
									onChange={(e) => setUserid2(e.target.value)}
									required
								/>
								)
							</div>
						</>
					) : gameFormat === "[userid]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Userid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
							</div>
						</>
					) : gameFormat === "[rolename]|[userid]|[zoneid]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Rolename " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
								<input
									type="text"
									placeholder={
										"Masukkan Userid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid2}
									onChange={(e) => setUserid2(e.target.value)}
									required
								/>
								(
								<input
									type="text"
									placeholder={
										"Masukkan Zoneid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid3}
									onChange={(e) => setUserid3(e.target.value)}
									required
								/>
								)
							</div>
						</>
					) : gameFormat === "[userid]|[serverid]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Userid " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
								<select
									value={userid2}
									onChange={(e) => setUserid2(e.target.value)}
									required
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
								>
									<option value={""}>- Pilih Server -</option>
									{gameServer.map((data, key) => {
										return (
											<option value={data.value} key={key}>
												{data.name}
											</option>
										);
									})}
								</select>
							</div>
						</>
					) : gameFormat === "[userid]|[tag]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Userid + Tag " +
										GameDataList?.productname +
										" Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
							</div>
						</>
					) : gameFormat === "[rolename]|[serverid]" ? (
						<>
							<p className="text-2xl font-bold mb-5">
								Masukkan ID {GameDataList?.productname} Anda!
							</p>
							<div className="flex gap-5 items-center">
								<input
									type="text"
									placeholder={
										"Masukkan Rolename " + GameDataList?.productname + " Anda!"
									}
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
									value={userid1}
									onChange={(e) => setUserid1(e.target.value)}
									required
								/>
								<select
									value={userid2}
									onChange={(e) => setUserid2(e.target.value)}
									required
									className="grow text-xs sm:text-sm bg-slate-900 p-2 rounded-lg border border-slate-800 outline-0 focus:ring-2 focus:ring-sky-500 ring-inset duration-500 ease-in-out"
								>
									<option value={""}>- Pilih Server -</option>
									{gameServer.map((data, key) => {
										return (
											<option value={data.value} key={key}>
												{data.name}
											</option>
										);
									})}
								</select>
							</div>
						</>
					) : (
						"CODE NOT FOUND"
					)}
				</Card>
				<Card className=" bg-slate-900">
					<p className="text-2xl font-bold mb-5">
						Pilih Item {GameDataList?.productname} Yang Anda Inginkan!
					</p>
					<hr />
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
						{pricelist.map((data, key) => {
							return (
								<label key={key} className="relative block cursor-pointer">
									<input
										type="radio"
										name="game-item"
										className="peer absolute top-4 right-4 w-4 h-4 text-blue-600 form-radio focus:ring-blue-500"
										value={data.product_code}
										onChange={() =>
											handleChangeProduct(
												data.product_code,
												data.product_nominal,
												data.product_price
											)
										}
										checked={product.code === data.product_code}
										hidden
									/>
									<div className="p-4 bg-slate-700 border border-slate-700 rounded-lg shadow-lg peer-checked:bg-slate-950 peer-checked:border-sky-500 hover:border-sky-500">
										<h2 className="text-sm font-semibold text-white">
											<i className="fa-regular fa-gem me-3 text-sky-500"></i>
											{data.product_nominal}
										</h2>
										<p className="mt-2 text-sm text-white italic">
											Dari : <FormatRupiah value={data.product_price} />
										</p>
									</div>
								</label>
							);
						})}
					</div>
				</Card>
				<Card className="bg-slate-900">
					<p className="text-2xl font-bold mb-5">
						Silahkan Pilih Metode Pembayaran!
					</p>
					<hr />
					<div className="grid grid-cols-2 gap-5 mt-5">
						{paymentchannel.map((data, key) => {
							return (
								<label key={key} className="relative block cursor-pointer">
									<input
										type="radio"
										name="payment-method"
										className="peer absolute top-4 right-4 w-4 h-4 text-blue-600 form-radio focus:ring-blue-500"
										hidden
										value={data.code}
										onChange={(e) => setPaymentMethod(e.target.value)}
										checked={paymentMethod === data.code}
									/>
									<div className="p-4 bg-slate-700 border border-slate-700 rounded-lg shadow-lg peer-checked:bg-slate-950 peer-checked:border-sky-500 hover:border-sky-500 h-full">
										<p className="mt-2 text-white italic flex flex-col sm:flex-row font-bold items-center">
											<span className="text-xs sm:text-2xl">{data.name}</span>
											<Image
												src={data.icon_url}
												alt={data.name}
												width={1000}
												height={1000}
												className="w-[100px] sm:w-[150px] h-auto ms-0 sm:ms-auto"
											/>
										</p>
									</div>
								</label>
							);
						})}
					</div>
					<button
						type="submit"
						className="bg-sky-500 hover:shadow-lg hover:shadow-sky-500 p-2 text-white rounded-lg mt-5 w-full duration-500 ease-in-out"
					>
						{topupIsLoading ? "Loading..." : "Bayar"}
					</button>
				</Card>
			</div>
		</form>
	);
};

export default PriceList;
