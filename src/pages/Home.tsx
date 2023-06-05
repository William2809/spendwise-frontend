import authService from "../utils/auth/AuthService";
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

function Home() {
	const user = JSON.parse(localStorage.getItem("user")!);
	const { isVisible, hideOverlay, showOverlay } = useOverlay();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [transactions, setTransactions] = useState<transactionForm[]>([]);
	const navigate = useNavigate();
	const logout = () => {
		authService.logout();
		navigate("/");
	};

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

	useEffect(() => {
		const fetchData = async () => {
			const result = await transactionService.getTransaction();
			setTransactions(result);
		};
		fetchData();
	}, [modalIsOpen]);

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
							className="  text-white flex h-[56px] overflow-hidden justify-between w-full"
							onClick={handleOverlayClick}
						>
							<button
								className="p-2 bg-primary hover:bg-primary-hover h-[56px] rounded-xl min-w-[160px]"
								onClick={() => setModalIsOpen(true)}
							>
								Add manually
							</button>
							<button className="p-2 bg-primary hover:bg-primary-hover rounded-xl">
								Voice
							</button>
						</div>
					)}
				</div>
			</div>

			<div className="mt-10 bg-chart-bg rounded-xl">
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

			<div className="pt-5">
				<div className="font-semibold text-[24px]">Recent Transactions</div>

				<div className="pt-3">
					<Transactions
						transactions={transactions}
						limit={-5}
					/>
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
