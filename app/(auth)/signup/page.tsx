import SignUp from "@/components/pages/auth/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: "/favico.png",
	title: "Daftar Akun Everse",
	description: "Gudang topup game",
};

export default function SignUpPage() {
	return <SignUp />;
}
