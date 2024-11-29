export default function Card({
	redirect = false,
	link = "",
	children,
	className = "",
}) {
	if (redirect)
		return (
			<a
				href={redirect ? link : "#"}
				className={`p-3 rounded-lg text-white w-full block ${className}`}
			>
				{children}
			</a>
		);

	return (
		<div className={`p-3 rounded-lg text-white ${className}`}>{children}</div>
	);
}
