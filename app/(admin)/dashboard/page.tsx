import { Index } from "@/components/pages/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Welcome To Dashboard Everse",
	description: "Dashboard Everse",
};

export default function HomeDashboard() {
	return <Index />;
}
