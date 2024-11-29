import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthProvider from "@/context/AuthProvider";

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body className="bg-slate-950">{children}</body>
			</html>
		</AuthProvider>
	);
}
