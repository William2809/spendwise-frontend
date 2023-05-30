import nullpng from "../assets/null.png";

function Deals() {
	const user = JSON.parse(localStorage.getItem("user")!);

	return (
		<div className="px-5 pt-4">
			<div className="flex items-center gap-3">
				<img
					src={user.picture ? `${user.picture}` : nullpng}
					className="rounded-full h-10"
					alt="User Profile"
				/>
				<h2 className="text-primary-muted font-semibold text-base">
					{user.name}
				</h2>
			</div>

			<div>{/* content */}</div>
		</div>
	);
}

export default Deals;
