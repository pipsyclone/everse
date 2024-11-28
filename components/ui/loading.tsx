const Loading = () => {
	return (
		<div className="absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] text-white text-center">
			<i className="animate-spin fa-solid fa-circle-notch me-3"></i>
			Loading...
		</div>
	);
};

export default Loading;
