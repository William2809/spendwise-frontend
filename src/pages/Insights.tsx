import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import insightsService from "../utils/insightsService";

function Insights() {
	const [isLoading, setIsLoading] = useState(false);
	const [recommendation, setRecommendation] = useState(null);

	const getRecommendation = async () => {
		setIsLoading(true);
		const response = await insightsService.analyzeAndRecommend();
		setRecommendation(response);
		setIsLoading(false);
	};

	return (
		<div className="p-5 ">
			{isLoading && <LoadingScreen />}
			<div>Recommendations:</div>
			<div className="mt-10">
				<div
					onClick={getRecommendation}
					className="p-4 bg-primary text-white text-[24px] font-semibold hover:bg-primary-hover rounded-xl max-w-min cursor-pointer"
				>
					Get Recommendations
				</div>
				{recommendation ? (
					<div className="p-3 rounded-xl mt-3 bg-secondary text-black">
						{recommendation}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Insights;
