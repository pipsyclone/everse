import axios from "axios";
import useSWR from "swr";
import { productimages } from "@/global/datagameimage";
import {
	GamesData,
	GamesFormatServers,
	GamesPricelist,
	ProductImages,
} from "./interface";

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data.data);

export function getGames<Data = GamesData[], Error = any>() {
	const { data, isValidating, error } = useSWR<Data, Error>(
		"/api/iak/get/games",
		fetcher
	);
	const isLoading = !data && isValidating;

	const dataWithImages = Array.isArray(data)
		? (data
				.map((item: GamesData) => {
					// Temukan gambar berdasarkan kesamaan nama
					const matchedImage = productimages.find(
						(product) => product.code === item.game_code
					);

					// Hanya tambahkan item jika gambar ditemukan
					return matchedImage ? { ...item, image: matchedImage.image } : null;
				})
				.filter(Boolean) as GamesData[]) // Hapus entri null dari hasil
		: [];

	return {
		gamelist: dataWithImages,
		getgameLoading: isLoading,
		error,
	};
}

export function productImages<Data = ProductImages[], Error = any>(
	gamecode: string
) {
	const matchedData = productimages.find(
		(data) => Number(data.code) === Number(gamecode)
	);

	return { productimage: matchedData };
}

const formatString = (input: string | null) => {
	return input ? input.toLowerCase().replace(/ /g, "_") : input?.toLowerCase();
};

export function getGamePricelist<Data = GamesPricelist[], Error = any>(
	gamename: string
) {
	const { data, isValidating, error } = useSWR<Data, Error>(
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

export function getGameFormat<Data = any, Error = any>(gamecode: number) {
	const { data, isValidating, error } = useSWR<Data, Error>(
		"/api/iak/get/games/format-server?gamecode=" + Number(gamecode),
		fetcher
	);

	const isLoading = !data && isValidating;
	return {
		dataFormatServers: data,
		gameFormat: (data as GamesFormatServers)?.format,
		gameServer: (data as GamesFormatServers)?.servers,
		gameformatserverLoading: isLoading,
		error,
	};
}

export function getPaymentChannel<Data = any, Error = any>() {
	const { data, isValidating, error } = useSWR<Data, Error>(
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

export function getDetailTransaction<Data = any, Error = any>(
	reference: string
) {
	const { data, isValidating, error } = useSWR<Data, Error>(
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
