import SignIn from "@/components/pages/auth/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Masuk Akun Everse",
	description: "Gudang topup game",
};
export default function SignInPage() {
	return <SignIn />;
}
