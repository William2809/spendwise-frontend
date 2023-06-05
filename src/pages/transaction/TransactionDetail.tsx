import { useLocation, useNavigate } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";
import { categories } from "../../components/Transactions";
import { transactionForm } from "../../components/TransactionModal";

const TransactionDetail = () => {
	const navigate = useNavigate();

	const returnBack = () => {
		return navigate(-1);
	};

	const location = useLocation();
	const transaction: transactionForm = location.state.transaction;

	let date = new Date("2023-06-04T11:22:01.900Z");

	let formattedDate = `${date.getFullYear()}/${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;

	return (
		<div className="px-5 pt-4">
			<div className="flex items-center gap-3 text-primary-muted">
				<MdArrowBack
					size="28"
					onClick={returnBack}
				/>
				<div className="text-[24px] font-semibold">Transaction Detail</div>
			</div>

			<div className="pt-10 flex items-center flex-col">
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
		</div>
	);
};

export default TransactionDetail;
