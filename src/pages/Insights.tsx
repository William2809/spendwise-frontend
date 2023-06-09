import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import insightsService from "../utils/insightsService";
import nullpng from "../assets/null.png";
import { ChartComponent } from "../components/ChartComponent";
import { RxUpdate } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";

function Insights() {
	const [isLoading, setIsLoading] = useState(false);
	var data = JSON.parse(localStorage.getItem("user")!);
	const [recommendation, setRecommendation] = useState(null);
	const [weeklyPrediction, setWeeklyPrediction] = useState([
		0, 0, 0, 0, 0, 0, 0,
	]);
	const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

	//make predictions
	// const getPrediction = async () => {
	// 	setIsLoading(true);
	// 	const result = await insightsService.predict();
	// 	setWeeklyPrediction((prevWeeklyPrediction) => {
	// 		const newWeeklyPrediction = [...prevWeeklyPrediction];
	// 		newWeeklyPrediction[result.day] = result.prediction;
	// 		insightsService.savePrediction(newWeeklyPrediction);
	// 		return newWeeklyPrediction;
	// 	});
	// 	setIsLoading(false);
	// };

	//get weekly predictions data from database
	const setPrediction = async () => {
		const result = await insightsService.getWeeklyPrediction();
		setWeeklyPrediction(result.weeklyPrediction);
	};

	const updateDailyTransaction = async () => {
		setIsLoading(true);
		const updatedPrediction = await insightsService.updateDailyTransaction();
		setWeeklyPrediction(updatedPrediction.prediction);
		await insightsService.savePrediction(updatedPrediction.prediction);
		setIsLoading(false);
		console.log(updatedPrediction.prediction);
	};

	const deleteDailyTransaction = async () => {
		setIsLoading(true);
		await insightsService.deleteAllDailyTransaction();
		setIsLoading(false);
	};

	useEffect(() => {
		setRecommendation(data.recommendation);
		setPrediction();
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
				<div className="w-full rounded-xl bg-chart-bg p-5">
					<div className="text-[24px] font-semibold text-white ">
						Next week's prediction
					</div>

					<div>
						<ChartComponent weeklySpending={weeklyPrediction} />
					</div>

					{weeklyPrediction &&
						weeklyPrediction.map((item, index) => {
							if (item > 0) {
								return (
									<div key={index}>
										<div className="text-[20px] font-semibold text-white flex justify-between w-[200px]">
											<p>{dayName[index]}</p> <p>&#165;{item.toFixed(2)}</p>
										</div>
										<div className="text-secondary"></div>
									</div>
								);
							}
						})}
					<div className="flex items-center mt-4 gap-2">
						<div
							onClick={updateDailyTransaction}
							className="p-3  bg-primary-muted text-white text-[20px]  font-semibold hover:bg-primary-hover rounded-xl  cursor-pointer text-center w-full flex gap-2 items-center justify-center"
						>
							<RxUpdate size="20"></RxUpdate>
							<div>Predict Next Week</div>
						</div>

						<div
							className="p-3  rounded-xl bg-primary-muted text-white hover:bg-primary-hover cursor-pointer"
							onClick={deleteDailyTransaction}
						>
							<FaRegTrashAlt size="28"></FaRegTrashAlt>
						</div>
					</div>
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
