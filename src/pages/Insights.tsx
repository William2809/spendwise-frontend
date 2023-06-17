import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import insightsService from "../utils/insightsService";
import nullpng from "../assets/null.png";

function Insights() {
	const [isLoading, setIsLoading] = useState(false);
	var data = JSON.parse(localStorage.getItem("user")!);
	const [recommendation, setRecommendation] = useState(null);
	const user = JSON.parse(localStorage.getItem("user")!);

	const getRecommendation = async () => {
		setIsLoading(true);
		const response = await insightsService.analyzeAndRecommend();
		// save recommendation to local storage
		let data = JSON.parse(localStorage.getItem("user")!);
		data.recommendation = response.replace(/\n/g, "<br>");
		localStorage.setItem("user", JSON.stringify(data));
		setRecommendation(data.recommendation);
		setIsLoading(false);
	};

	useEffect(() => {
		setRecommendation(data.recommendation);
		console.log(data.recommendation);
	}, []);

	return (
		<div className="px-5 pt-4 pb-[100px] max-w-lg">
			<div className="flex justify-between items-center w-full">
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
			</div>

			{isLoading && <LoadingScreen />}

			<div className="pt-4">
				<div className="w-full rounded-xl bg-primary p-5">
					<div className="text-[24px] font-semibold text-white ">
						Next week's prediction
					</div>
					<div className="text-secondary">*Chart*</div>
				</div>

				<div className="mt-5">
					<div className="text-[24px] font-semibold text-black my-3">
						Recommendations
					</div>
					<div className="w-full">
						<div
							onClick={getRecommendation}
							className="p-4 bg-primary text-white text-[24px] font-semibold hover:bg-primary-hover rounded-xl  cursor-pointer text-center"
						>
							Get Recommendations
						</div>
						{recommendation ? (
							<div
								className="p-3 rounded-xl mt-3 bg-secondary text-black"
								dangerouslySetInnerHTML={{ __html: recommendation }}
							></div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Insights;
