interface CardProps {
	redirect?: boolean;
	link?: string | "#";
	className?: string;
	children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
	redirect = false,
	link,
	className = "",
	children,
}) => {
	if (redirect)
		return (
			<a
				href={link}
				className={`p-3 rounded-lg text-white w-full block ${className}`}
			>
				{children}
			</a>
		);

	return (
		<div className={`p-3 rounded-lg text-white ${className}`}>{children}</div>
	);
};
export default Card;
