import Footer from "@/components/footer";
import Index from "@/components/pages/customer";
import Topbar from "@/components/topbar";

import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  icons: "/favico.png",
  title: "Selamat Datang di Everse",
  description: "Gudang topup game",
};

const Home = () => {
  return (
    <Fragment>
      <Topbar />
      <div className="w-[90%] mx-auto mt-5 mb-5">
        <Index />
      </div>
      <Footer />
    </Fragment>
  );
};
export default Home;
