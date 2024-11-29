export default function Middle({ className = "", children }) {
	return (
		<div
			className={`absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] text-white text-center ${className}`}
		>
			{children}
		</div>
	);
}
