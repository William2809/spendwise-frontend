import authService from "../utils/auth/AuthService";
import { useNavigate } from "react-router-dom";
import nullpng from "../assets/null.png";

function Home() {
	const user = JSON.parse(localStorage.getItem("user")!);

	const navigate = useNavigate();
	const logout = () => {
		authService.logout();
		navigate("/");
	};

	if (!user) {
		navigate("/");
	}
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
			<div className="py-10">Home Page</div>
			<div className="mt-10 space-y-2">
				<div>Temporary log out button</div>
				<button
					className="rounded-lg bg-primary font-semibold hover:bg-primary-hover text-white py-2 px-4"
					onClick={logout}
				>
					Log out
				</button>
			</div>
		</div>
	);
}

export default Home;
