"use client";
import Card from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		signIn("credentials", { identifier, password, redirect: false }).then(
			async (res) => {
				if (res?.error) {
					console.log(res.error);
				} else return (window.location.href = "/dashboard");
				setIsLoading(false);
			}
		);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Card className="bg-slate-800 rounded-lg border w-[400px] border-slate-700">
			<div className="mb-5 mt-2 text-center text-2xl">SIGN IN</div>
			<hr />
			<form onSubmit={handleSignIn} className="flex flex-col gap-5 mt-5">
				<div className="">
					<label className="text-sm">Username / Email / Nomor HP : </label>
					<input
						type="text"
						className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
						placeholder="Masukkan Username / Email / Nomor Hp"
						value={identifier}
						onChange={(e) => setIdentifier(e.target.value)}
					/>
				</div>
				<div>
					<label className="text-sm">Password : </label>
					<input
						type="password"
						className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
						placeholder="Masukkan Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button
						type="submit"
						className="bg-sky-500 p-2 rounded-lg hover:bg-sky-400 duration-500 ease-in-out text-white w-full"
					>
						Sign In
					</button>
					<span className="text-sm">
						Tidak mempunyai akun?{" "}
						<a href="/signup" className="text-sky-500 italic">
							Daftar
						</a>
					</span>
				</div>
				{/* <div className="flex items-center">
					<div className="flex-grow border-t border-gray-300"></div>
					<span className="mx-4 text-gray-500">or</span>
					<div className="flex-grow border-t border-gray-300"></div>
				</div>
				<button
					type="submit"
					className="border border-red-500 p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 duration-500 ease-in-out"
				>
					<i className="fa-brands fa-google"></i> Sign in with Google
				</button> */}
			</form>
			<div className="text-center text-sm italic text-slate-500 mt-5">
				Licensed by everse 2024
			</div>
		</Card>
	);
};

export default SignIn;
