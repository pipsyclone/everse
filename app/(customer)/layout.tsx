import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import AuthProvider from "@/context/AuthProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
