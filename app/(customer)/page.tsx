import Index from "@/components/pages/customer";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Selamat Datang di Everse",
	description: "Gudang topup game",
};

const Home = () => {
	return <Index />;
};
export default Home;
