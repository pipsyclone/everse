"use client";
import Card from "@/components/ui/card";
import Scripts from "@/utils/scripts";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface FormData {
	name: string;
	email: string;
	nophone: string;
	username: string;
	password: string;
}

const SignUp = () => {
	const { Alert } = Scripts();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formdata, setFormdata] = useState<FormData>({
		name: "",
		email: "",
		nophone: "",
		username: "",
		password: "",
	});

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);
		await axios
			.post("/api/users/post/register", formdata)
			.then((res) => {
				if (res.data.status === 200) {
					Alert("success", "Berhasil!", res.data.message);

					setFormdata((prev) =>
						Object.keys(prev).reduce((acc, key) => {
							acc[key as keyof FormData] = "";
							return acc;
						}, {} as FormData)
					);
				}

				toast.error(res.data.message, {
					position: "top-right",
				});
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setIsLoading(false);
			});
	};

	return (
		<Card className="bg-slate-800 rounded-lg border w-[400px] border-slate-700">
			<ToastContainer />
			<div className="mb-5 mt-2 text-center text-2xl">SIGN UP</div>
			<hr />
			<form onSubmit={handleRegister} className="flex flex-col gap-5 mt-5">
				<div>
					<label className="text-sm">Nama Lengkap : </label>
					<input
						type="text"
						className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
						placeholder="Masukkan Nama Lengkap"
						value={formdata.name}
						onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
					/>
				</div>
				<div>
					<label className="text-sm">Email : </label>
					<input
						type="email"
						className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
						placeholder="Masukkan Email"
						value={formdata.email}
						onChange={(e) =>
							setFormdata({ ...formdata, email: e.target.value })
						}
					/>
				</div>
				<div>
					<label className="text-sm">Nomor Hp : </label>
					<input
						type="text"
						className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
						placeholder="Masukkan Nomor Hp"
						value={formdata.nophone}
						onChange={(e) =>
							setFormdata({ ...formdata, nophone: e.target.value })
						}
					/>
				</div>
				<div className="flex gap-3">
					<div className="basis-1/2">
						<label className="text-sm">Username : </label>
						<input
							type="text"
							className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
							placeholder="Masukkan Username"
							value={formdata.username}
							onChange={(e) =>
								setFormdata({ ...formdata, username: e.target.value })
							}
						/>
					</div>
					<div className="basis-1/2">
						<label className="text-sm">Password : </label>
						<input
							type="password"
							className="bg-slate-700 outline-0 focus:ring-2 focus:ring-sky-500 focus:ring-inset p-2 rounded-lg text-sm w-full"
							placeholder="Masukkan Password"
							value={formdata.password}
							onChange={(e) =>
								setFormdata({ ...formdata, password: e.target.value })
							}
						/>
					</div>
				</div>
				<div>
					<button
						type="submit"
						className={`${
							isLoading ? "opacity-75" : ""
						} bg-sky-500 p-2 rounded-lg hover:bg-sky-400 duration-500 ease-in-out text-white w-full`}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<i className="animate-spin fa-solid fa-circle-notch me-3"></i>
								Loading...
							</>
						) : (
							"Sign Up"
						)}
					</button>
					<span className="text-sm">
						Sudah mempunyai akun?{" "}
						<a href="/signin" className="text-sky-500 italic">
							Sign In
						</a>
					</span>
				</div>
			</form>
			<div className="text-center text-sm italic text-slate-500 mt-5">
				Licensed by everse 2024
			</div>
		</Card>
	);
};

export default SignUp;
