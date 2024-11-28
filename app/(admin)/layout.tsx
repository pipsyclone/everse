import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function DashboarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-slate-100">{children}</body>
		</html>
	);
}
