interface MiddleProps {
	className?: string;
	children: React.ReactNode;
}

const Middle: React.FC<MiddleProps> = ({ className = "", children }) => {
	return (
		<div
			className={`absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] text-white text-center ${className}`}
		>
			{children}
		</div>
	);
};

export default Middle;
