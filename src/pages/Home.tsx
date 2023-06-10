import { Link, useNavigate } from "react-router-dom";
import nullpng from "../assets/null.png";
import { ChartComponent } from "../components/ChartComponent";
import { MdHistory, MdOutlineAdd } from "react-icons/md";
import { useOverlay } from "../hooks/useOverlay";
import { useEffect, useState } from "react";
import TransactionModal, {
	transactionForm,
} from "../components/TransactionModal";
import transactionService from "../utils/transaction/transactionService";
import Transactions from "../components/Transactions";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import VoiceModal from "../components/VoiceModal";

function Home() {
	const user = JSON.parse(localStorage.getItem("user")!);
	const { isVisible, hideOverlay, showOverlay } = useOverlay();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [voiceIsOpen, setVoiceIsOpen] = useState(false);
	const [transactions, setTransactions] = useState<transactionForm[]>([]);
	const [weeklySpending, setWeeklySpending] = useState<number[]>([
		0, 0, 0, 0, 0, 0, 0,
	]);
	const [total, setTotal] = useState(0);

	const navigate = useNavigate();

	if (!user) {
		navigate("/");
	}

	const handleAddClick = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
		showOverlay();
	};

	const handleOverlayClick = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
	};

	function isThisWeek(date: Date) {
		const now = new Date();
		const startOfWeek = new Date(
			Date.UTC(
				now.getUTCFullYear(),
				now.getUTCMonth(),
				now.getUTCDate() - ((now.getUTCDay() + 6) % 7)
			)
		);
		const endOfWeek = new Date(
			Date.UTC(
				startOfWeek.getUTCFullYear(),
				startOfWeek.getUTCMonth(),
				startOfWeek.getUTCDate() + 6
			)
		);
		return date >= startOfWeek && date <= endOfWeek;
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await transactionService.getTransaction();
			setTransactions(result);
			//set data for chart
			const weeklySpending = [0, 0, 0, 0, 0, 0, 0];
			let total = 0;
			result.forEach((transaction: transactionForm) => {
				const transactionDate = new Date(transaction.createdAt);
				if (isThisWeek(transactionDate)) {
					const day = (transactionDate.getDay() - 1 + 7) % 7;
					weeklySpending[day] += transaction.amount || 0;
					total += transaction.amount || 0;
				}
			});
			setTotal(total);
			setWeeklySpending(weeklySpending);
		};

		fetchData();
	}, [modalIsOpen, voiceIsOpen]);

	const {
		text,
		isListening,
		startListening,
		stopListening,
		hasRecognitionSupport,
	} = useSpeechRecognition();
	return (
		<div
			className="px-5 pt-4 pb-[100px] max-w-lg"
			onClick={hideOverlay}
		>
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
				<Link to="/history">
					<MdHistory
						size="36"
						className="text-primary-muted"
					/>
				</Link>
			</div>

			<TransactionModal
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				hideOverlay={hideOverlay}
			/>

			<VoiceModal
				voiceIsOpen={voiceIsOpen}
				setVoiceIsOpen={setVoiceIsOpen}
				text={text}
				isListening={isListening}
				startListening={startListening}
				stopListening={stopListening}
			/>

			<div className="sm:hidden">
				<div
					className={` text-white fixed bottom-[80px] right-5 flex items-center text-[20px] font-semibold p-3 px-5 rounded-[20px] z-10 cursor-pointer ease-in-out duration-500  outline-none overflow-hidden shadow-md ${
						!isVisible
							? "w-[110px] bg-primary hover:bg-primary-hover"
							: "w-[280px] bg-secondary"
					}`}
					onClick={handleAddClick}
				>
					{!isVisible && (
						<div className="flex justify-center items-center gap-1">
							<MdOutlineAdd size="28" />
							<div>Add</div>
						</div>
					)}

					{isVisible && (
						<div
							className="text-white flex h-[56px] overflow-hidden justify-between w-full"
							onClick={handleOverlayClick}
						>
							<button
								className="p-2 bg-primary hover:bg-primary-hover h-[56px] rounded-xl min-w-[160px]"
								onClick={() => setModalIsOpen(true)}
							>
								Add manually
							</button>
							<button
								onClick={() => {
									setVoiceIsOpen(true);
									startListening();
								}}
								className="p-2 bg-primary hover:bg-primary-hover rounded-xl"
							>
								Voice
							</button>
						</div>
					)}
				</div>
			</div>

			<div>
				{hasRecognitionSupport ? (
					<div>
						{isListening ? (
							<div>Your browser is currently listening</div>
						) : null}
						{/* {text} */}
					</div>
				) : (
					<div>Your Browser did not support voice recognition.</div>
				)}
			</div>

			{/* CHART */}
			<div className="mt-10 bg-chart-bg rounded-xl">
				<div className="px-5 pt-4">
					<div className="font-bold text-primary-muted text-[20px]">
						This Week's Spending
					</div>
					<div className="text-white font-semibold text-[48px]">
						&#165;{total}
					</div>
				</div>
				<div>
					<ChartComponent weeklySpending={weeklySpending} />
				</div>
			</div>

			<div className="pt-5">
				<div className="font-semibold text-[24px]">Recent Transactions</div>

				<div className="pt-3">
					<Transactions
						transactions={transactions}
						limit={-5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
