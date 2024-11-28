import type { NextConfig } from "next";

const appurl = process.env.NEXT_PUBLIC_APP_URL || "";
const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["http://localhost:3000", "assets.tripay.co.id"],
	},
};

export default nextConfig;
