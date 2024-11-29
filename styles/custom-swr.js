import axios from "axios";
import useSWR from "swr";
import { GameDataList } from "@/global/dataGameImage";

const fetcher = async (url) =>
	await axios.get(url).then((res) => res.data.data);

export function getGames() {
	const { data, isValidating, error } = useSWR("/api/iak/get/games", fetcher);
	const isLoading = !data && isValidating;

	const dataWithImages = Array.isArray(data)
		? data
				.map((item) => {
					// Temukan gambar berdasarkan kesamaan nama
					const matchedImage = GameDataList.find(
						(product) => product.code === item.game_code
					);

					// Hanya tambahkan item jika gambar ditemukan
					return matchedImage ? { ...item, image: matchedImage.image } : null;
				})
				.filter(Boolean) // Hapus entri null dari hasil
		: [];

	return {
		gamelist: dataWithImages,
		getgameLoading: isLoading,
		error,
	};
}

export function productImages(gamecode) {
	const matchedData = GameDataList.find(
		(data) => parseInt(data.code) === parseInt(gamecode)
	);

	return { GameDataList: matchedData };
}

const formatString = (input) => {
	return input ? input.toLowerCase().replace(/ /g, "_") : input?.toLowerCase();
};

export function getGamePricelist(gamename) {
	const { data, isValidating, error } = useSWR(
		"/api/iak/get/games/pricelist?gamename=" + formatString(gamename),
		fetcher
	);

	const isLoading = !data && isValidating;

	// Mengurutkan pricelist berdasarkan product_price
	const sortedPricelist = Array.isArray(data)
		? [...data].sort((a, z) => a.product_price - z.product_price)
		: null;

	return {
		pricelist: sortedPricelist,
		pricelistLoading: isLoading,
		error,
	};
}

export function getGameFormat(gamecode) {
	const { data, isValidating, error } = useSWR(
		"/api/iak/get/games/format-server?gamecode=" + Number(gamecode),
		fetcher
	);

	const isLoading = !data && isValidating;
	return {
		dataFormatServers: data,
		gameFormat: data?.format,
		gameServer: data?.servers,
		gameformatserverLoading: isLoading,
		error,
	};
}

export function getPaymentChannel() {
	const { data, isValidating, error } = useSWR(
		"/api/tripay/get/payment-channel",
		fetcher
	);

	const isLoading = !data && isValidating;
	return {
		paymentchannel: data,
		paymentchannelLoading: isLoading,
		error,
	};
}

export function getDetailTransaction(reference) {
	const { data, isValidating, error } = useSWR(
		"/api/tripay/get/detail-transaction?reference=" + reference,
		fetcher
	);

	const isLoading = !data && isValidating;
	return {
		detailtrx: data,
		detailtrxLoading: isLoading,
		error,
	};
}
