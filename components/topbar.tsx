"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SignInBar from "./SignInBar";

const Topbar = () => {

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
          <SignInBar />
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
