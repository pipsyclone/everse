export interface GamesData {
	game_code: string | number;
	name: string;
	image: string;
}

export interface ProductImages {
	code: number;
	productname: string;
	image: string;
}

export interface GamesPricelist {
	product_code: string;
	product_description: string;
	product_nominal: string;
	product_details: string;
	product_price: number;
	product_type: string;
	active_period: string;
	status: string;
	icon_url: string;
	product_category: string;
}

export interface GamesFormatServers {
	format: string;
	servers: Array<Record<string, any>>;
}

export interface ProductData {
	code: string;
	name: string;
	price: number;
}

export interface PostSwr {
	url: string;
	formdata: any;
}
