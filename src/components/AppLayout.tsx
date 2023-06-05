import Navbar from "./Navbar";

function AppLayout({ children }: any) {
	return (
		<div className="">
			{children}
			<Navbar />
		</div>
	);
}

export default AppLayout;
