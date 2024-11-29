"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Topbar = () => {
	const { data: session, status } = useSession();
	return (
		<nav className="bg-slate-950 p-2 w-full">
			<div className="flex justify-between items-center w-[90%] mx-auto">
				<a href="/#">
					<Image
						src={"/logo.png"}
						alt="Logo"
						width={1000}
						height={1000}
						className="w-[150px] h-auto"
					/>
				</a>
				<div className="flex gap-10">
					<form className="hidden gap-3 sm:flex">
						<input
							type="text"
							className="bg-white rounded-s-full rounded-e-full p-2 text-sm outline-0 focus:ring-sky-500 focus:ring-2 ring-inset"
							placeholder="Cari game..."
						/>
						<button type="button" className="text-white">
							<i className="fa-solid fa-magnifying-glass text-white"></i>
						</button>
					</form>
					{status === "loading" ? (
						""
					) : status !== "unauthenticated" ? (
						<a href="/profile" className="flex gap-3 items-center">
							<Image
								src={"/user.png"}
								alt="Logo User"
								width={1000}
								height={1000}
								className="w-[40px] h-[40px]"
							/>
							<span className="text-white text-sm">
								<i>Hi,</i> {session.user.name}
							</span>
						</a>
					) : (
						<a
							href="/signin"
							className="text-sm bg-sky-500 hover:shadow-lg hover:shadow-sky-400 text-white rounded-s-full rounded-e-full p-2 duration-500 ease-in-out"
						>
							Masuk / Daftar
						</a>
					)}
				</div>
			</div>
			<div className="block mt-5 sm:mt-0 sm:hidden">
				<form className="flex gap-3 mx-auto justify-center items-center w-[90%]">
					<input
						type="text"
						className="bg-white rounded-s-full rounded-e-full p-2 text-sm outline-0 focus:ring-sky-500 focus:ring-2 ring-inset grow"
						placeholder="Cari game..."
					/>
					<button type="button" className="text-white">
						<i className="fa-solid fa-magnifying-glass text-white"></i>
					</button>
				</form>
			</div>
		</nav>
	);
};

export default Topbar;
