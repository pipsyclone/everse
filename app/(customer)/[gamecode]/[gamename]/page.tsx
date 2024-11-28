import PriceList from "@/components/pages/customer/pricelist";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Price List",
	description: "Gudang topup game",
};

export default function PriceListPage() {
	return <PriceList />;
}
