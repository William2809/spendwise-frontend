import authService from "../utils/auth/AuthService";
import { useNavigate } from "react-router-dom";
import nullpng from "../assets/null.png";
import { ChartComponent } from "../components/ChartComponent";

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

			<div className="my-10 bg-chart-bg rounded-xl">
				<div className="px-5 pt-4">
					<div className="font-bold text-primary-muted text-[20px]">
						Average spending per week
					</div>
					<div className="text-white font-semibold text-[48px]">${1000}</div>
				</div>
				<div className=" ">
					<ChartComponent />
				</div>
			</div>
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
