import { useLocation, useNavigate } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";
import { categories } from "../../components/Transactions";
import { transactionForm } from "../../components/TransactionModal";
import { useState } from "react";
import transactionService from "../../utils/transaction/transactionService";
import LoadingScreen from "../../components/LoadingScreen";
import { useOverlay } from "../../hooks/useOverlay";
import EditTransactionModal from "../../components/EditTransactionModal";

const TransactionDetail = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { hideOverlay } = useOverlay();
	const [refreshKey, setRefreshKey] = useState(1000);
	const returnBack = () => {
		return navigate(-1);
	};

	const location = useLocation();
	const transaction: transactionForm = location.state.transaction;

	let date = new Date(transaction.createdAt);

	let formattedDate = `${date.getFullYear()}/${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;

	const deleteTransaction = async (transaction: transactionForm) => {
		setIsLoading(true);
		await transactionService.deleteTransaction(transaction._id);
		setIsLoading(false);
		returnBack();
	};

	const editTransaction = () => {
		setModalIsOpen(true);
	};

	return (
		<div className="px-5 pt-4 h-screen flex flex-col">
			{isLoading && <LoadingScreen />}
			<EditTransactionModal
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				hideOverlay={hideOverlay}
				oldTransaction={transaction}
				refreshKey={refreshKey}
				setRefreshKey={setRefreshKey}
			/>
			<div className="flex items-center gap-3 text-primary-muted">
				<MdArrowBack
					size="28"
					onClick={returnBack}
				/>
				<div className="text-[24px] font-semibold">Transaction Detail</div>
			</div>

			<div className="pt-10 flex items-center justify-between flex-col flex-grow pb-[160px]">
				<div className="flex flex-col items-center">
					<div className="text-[28px] font-semibold mb-10">
						{transaction.name}
					</div>
					<div className="bg-primary-muted flex rounded-lg max-w-min">
						{categories.map((category, categoryIndex) => {
							return (
								category.name === transaction.category && (
									<div
										className="flex items-center justify-center p-3 "
										key={categoryIndex}
									>
										{category.icon}
									</div>
								)
							);
						})}
					</div>
					<div className="font-semibold text-[24px] mb-10">
						{transaction.category}
					</div>
					<div className="font-medium text-disabled text-[20px] ">
						{transaction.item}
					</div>
					<div className="text-disabled text-[20px] text-center">
						<div>
							Transaction on{" "}
							{date.toLocaleString("en-US", {
								weekday: "long",
							})}
						</div>
						<div>{formattedDate}</div>
					</div>
				</div>

				<div className="flex w-full gap-2 text-white font-semibold text-[20px]">
					<button
						className="w-1/2 bg-primary rounded-lg py-3 text-center hover:bg-primary-hover"
						onClick={editTransaction}
					>
						Edit
					</button>
					<button
						className="w-1/2 bg-primary rounded-lg py-3 text-center hover:bg-primary-hover "
						onClick={() => deleteTransaction(transaction)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetail;
