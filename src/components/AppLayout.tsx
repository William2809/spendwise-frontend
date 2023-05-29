import Navbar from "./Navbar";

function AppLayout({ children }: any) {
	return (
		<div>
			{children}
			<Navbar />
		</div>
	);
}

export default AppLayout;
