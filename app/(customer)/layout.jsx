import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthProvider from "@/context/AuthProvider";

import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body className="bg-slate-950">
					<main className="flex flex-col h-screen">
						<Topbar />
						<div className="w-[90%] mx-auto mt-5 mb-5">{children}</div>
						<Footer />
					</main>
				</body>
			</html>
		</AuthProvider>
	);
}
