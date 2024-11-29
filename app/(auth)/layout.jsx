import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AuthLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-slate-900 relative w-full h-screen">
				<div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
					{children}
				</div>
			</body>
		</html>
	);
}
