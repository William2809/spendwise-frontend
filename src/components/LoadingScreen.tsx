const LoadingScreen = () => {
	return (
		<div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-black">
			<div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
		</div>
	);
};

export default LoadingScreen;
