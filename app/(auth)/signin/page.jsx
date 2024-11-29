import SignIn from "@/components/pages/auth/signin";

export const metadata = {
	icons: "/favico.png",
	title: "Masuk Akun Everse",
	description: "Gudang topup game",
};

export default function page() {
	return <SignIn />;
}
