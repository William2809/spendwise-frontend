import { FC } from "react";
import { transactionForm } from "./TransactionModal";
import {
	MdArrowForwardIos,
	MdBrush,
	MdCardGiftcard,
	MdDevices,
	MdDirectionsCar,
	MdFlight,
	MdHelp,
	MdHome,
	MdLocalGroceryStore,
	MdLocalHospital,
	MdMovie,
	MdPower,
	MdRestaurant,
	MdSchool,
	MdSecurity,
	MdStyle,
	MdTrendingUp,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface Props {
	transactions: transactionForm[];
	limit: number | undefined;
}

const iconSize = "32";
const iconClassName = "text-secondary flex items-center justify-center";

const categories = [
	{
		name: "Groceries",
		icon: (
			<MdLocalGroceryStore
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Eating Out",
		icon: (
			<MdRestaurant
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Transportation",
		icon: (
			<MdDirectionsCar
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Utilities",
		icon: (
			<MdPower
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Rent",
		icon: (
			<MdHome
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Entertainment",
		icon: (
			<MdMovie
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Healthcare",
		icon: (
			<MdLocalHospital
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Personal Care",
		icon: (
			<MdBrush
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Clothing",
		icon: (
			<MdStyle
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Electronics",
		icon: (
			<MdDevices
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Education",
		icon: (
			<MdSchool
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Travel",
		icon: (
			<MdFlight
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Gifts & Donations",
		icon: (
			<MdCardGiftcard
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Insurance",
		icon: (
			<MdSecurity
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Investments",
		icon: (
			<MdTrendingUp
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
	{
		name: "Miscellaneous",
		icon: (
			<MdHelp
				size={`${iconSize}`}
				className={`${iconClassName}`}
			/>
		),
	},
];

const Transactions: FC<Props> = ({ transactions, limit }): JSX.Element => {
	// console.log(transactions);
	const navigate = useNavigate();

	const handleTransactionClick = (transaction: transactionForm) => {
		navigate(`/transaction/${transaction._id}`, { state: { transaction } });
	};
	return (
		<div>
			{transactions.length > 0 && (
				<div className="flex flex-col gap-2">
					{transactions
						.slice(limit)
						.reverse()
						.map((transaction, index) => (
							<div
								onClick={() => handleTransactionClick(transaction)}
								key={index}
								className="flex bg-secondary px-3 py-2 rounded-xl  justify-between"
							>
								<div className="flex items-center gap-4">
									<div className="bg-primary-muted flex rounded-lg">
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
									<div>
										<div className="font-semibold ">{transaction.name}</div>
										<div className="text-[14px] text-disabled">
											{transaction.category}
										</div>
										<div className="text-[14px] text-disabled">
											{new Date(transaction.createdAt).toLocaleString("en-US", {
												weekday: "long",
											})}
										</div>
									</div>
								</div>
								<div className="flex gap-2 items-center h-min font-bold">
									&#165;{transaction.amount} <MdArrowForwardIos size="20" />
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default Transactions;
