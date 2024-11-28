"use client";
import { useState } from "react";
import axios from "axios";
import { ProductData } from "@/utils/interface";
import Scripts from "@/utils/scripts";
import { useSession } from "next-auth/react";

const CheckoutControllers = () => {
	const { status } = useSession();
	const { Alert } = Scripts();
	const [topupIsLoading, setTopupIsLoading] = useState(false);

	const [userid1, setUserid1] = useState<string>("");
	const [userid2, setUserid2] = useState<string>("");
	const [userid3, setUserid3] = useState<string>("");
	const [product, setProduct] = useState<ProductData>({
		code: "",
		name: "",
		price: 0,
	});
	const [customerPhone] = useState<string>("085155467817");
	const [customerEmail] = useState<string>("apip@mail.com");
	const [paymentMethod, setPaymentMethod] = useState<string>("");

	const handleChangeProduct = (code: string, name: string, price: number) => {
		setProduct({
			code,
			name,
			price,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
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
							"/payment?tripay_reference=" + res.data.reference;
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

	return {
		topupIsLoading,
		userid1,
		setUserid1,
		userid2,
		setUserid2,
		userid3,
		setUserid3,
		customerPhone,
		customerEmail,
		product,
		setProduct,
		paymentMethod,
		setPaymentMethod,
		handleChangeProduct,
		handleSubmit,
	};
};

export default CheckoutControllers;
