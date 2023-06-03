import { useState, useEffect } from "react";
import {
	MdArrowBack,
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
import { transactionForm } from "../components/TransactionModal";
import transactionService from "../utils/transaction/transactionService";

const categories = [
	{
		name: "Groceries",
		icon: <MdLocalGroceryStore />,
	},
	{
		name: "Eating Out",
		icon: <MdRestaurant />,
	},
	{
		name: "Transportation",
		icon: <MdDirectionsCar />,
	},
	{
		name: "Utilities",
		icon: <MdPower />,
	},
	{
		name: "Rent",
		icon: <MdHome />,
	},
	{
		name: "Entertainment",
		icon: <MdMovie />,
	},
	{
		name: "Healthcare",
		icon: <MdLocalHospital />,
	},
	{
		name: "Personal Care",
		icon: <MdBrush />,
	},
	{
		name: "Clothing",
		icon: <MdStyle />,
	},
	{
		name: "Electronics",
		icon: <MdDevices />,
	},
	{
		name: "Education",
		icon: <MdSchool />,
	},
	{
		name: "Travel",
		icon: <MdFlight />,
	},
	{
		name: "Gifts & Donations",
		icon: <MdCardGiftcard />,
	},
	{
		name: "Insurance",
		icon: <MdSecurity />,
	},
	{
		name: "Investments",
		icon: <MdTrendingUp />,
	},
	{
		name: "Miscellaneous",
		icon: <MdHelp />,
	},
];

function History() {
	const [transactions, setTransactions] = useState<transactionForm[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await transactionService.getTransaction();
			setTransactions(result);
		};

		fetchData();
	}, []);
	return (
		<div className="px-5 pt-4">
			<div className="flex items-center">
				<MdArrowBack />
				<div>Transaction History</div>
			</div>

			<div>
				{transactions.length > 0 && (
					<div>
						{transactions.map((transaction, index) => (
							<div key={index}>
								<div>
									{categories.map((category, categoryIndex) => (
										<div key={categoryIndex}>
											{category.name === transaction.category && category.icon}
										</div>
									))}
								</div>
								{transaction.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default History;
