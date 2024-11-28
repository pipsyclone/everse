import Invoice from "@/components/pages/customer/invoice";

import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Invoice",
	description: "Gudang topup game",
};

export default function InvoicePage() {
	return <Invoice />;
}
