import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import transactionService from "../utils/transaction/transactionService";
import LoadingScreen from "./LoadingScreen";
import {
	MdLocalGroceryStore,
	MdRestaurant,
	MdDirectionsCar,
	MdPower,
	MdHome,
	MdMovie,
	MdLocalHospital,
	MdBrush,
	MdStyle,
	MdDevices,
	MdSchool,
	MdFlight,
	MdCardGiftcard,
	MdSecurity,
	MdTrendingUp,
	MdHelp,
} from "react-icons/md";

export interface transactionForm {
	_id: string;
	createdAt: string;
	name: string | undefined;
	item: string | undefined;
	category: string | undefined;
	amount: number | null | undefined;
}

type TransactionModalProps = {
	setModalIsOpen: (isOpen: boolean) => void;
	hideOverlay: () => void;
	modalIsOpen: boolean;
};

export const categories = [
	{ name: "Groceries", icon: <MdLocalGroceryStore /> },
	{ name: "Eating Out", icon: <MdRestaurant /> },
	{ name: "Transportation", icon: <MdDirectionsCar /> },
	{ name: "Utilities", icon: <MdPower /> },
	{ name: "Rent", icon: <MdHome /> },
	{ name: "Entertainment", icon: <MdMovie /> },
	{ name: "Healthcare", icon: <MdLocalHospital /> },
	{ name: "Personal Care", icon: <MdBrush /> },
	{ name: "Clothing", icon: <MdStyle /> },
	{ name: "Electronics", icon: <MdDevices /> },
	{ name: "Education", icon: <MdSchool /> },
	{ name: "Travel", icon: <MdFlight /> },
	{ name: "Gifts & Donations", icon: <MdCardGiftcard /> },
	{ name: "Insurance", icon: <MdSecurity /> },
	{ name: "Investments", icon: <MdTrendingUp /> },
	{ name: "Miscellaneous", icon: <MdHelp /> },
];

const initialTrsactionForm = {
	name: "",
	item: "",
	category: categories[0].name,
	amount: null,
	createdAt: "",
	_id: "",
};

const TransactionModal: React.FC<TransactionModalProps> = ({
	setModalIsOpen,
	modalIsOpen,
	hideOverlay,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [transaction, setTransaction] =
		useState<transactionForm>(initialTrsactionForm);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTransaction((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTransaction((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await transactionService.addTransaction(transaction);
			setTransaction(initialTrsactionForm);
			setIsLoading(false);
			setModalIsOpen(false);
		} catch (error: any) {
			console.log("error");
		}
	};
	return (
		<div>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<ReactModal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					onAfterOpen={() => hideOverlay()}
					style={{
						overlay: {
							backgroundColor: "rgba(0, 0, 0, 0.75)",
							zIndex: 20,
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
						},
						content: {
							color: "lightsteelblue",
							height: "400px",
							margin: "auto",
							background: "#C5DDC6",
							borderRadius: "16px",
						},
					}}
					contentLabel="Example Modal"
					shouldCloseOnOverlayClick={true}
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>
					<h2 className="text-primary-muted text-[24px] font-bold">
						Add Transaction
					</h2>
					<form
						className="mt-4 flex flex-col gap-3"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							name="name"
							className="outline-none border-none bg-white w-full rounded-lg text-primary-muted font-medium placeholder:text-disabled p-2"
							placeholder="Transaction Name"
							value={transaction.name}
							onChange={onChange}
							required
							autoComplete="off"
						/>

						<input
							type="text"
							name="item"
							className="outline-none border-none bg-white w-full rounded-lg text-primary-muted font-medium placeholder:text-disabled p-2"
							placeholder="item"
							value={transaction.item}
							onChange={onChange}
							required
							autoComplete="off"
						/>

						<select
							name="category"
							value={transaction.category}
							onChange={handleChange}
							className="outline-none border-none bg-white w-full rounded-lg text-primary-muted font-medium p-2"
							required
						>
							{categories.map((category, index) => (
								<option
									key={index}
									value={category.name}
								>
									{category.name}
								</option>
							))}
						</select>

						<input
							type="text"
							name="amount"
							className="outline-none border-none bg-white w-full rounded-lg text-primary-muted font-medium placeholder:text-disabled p-2"
							placeholder="Amount in yen"
							value={transaction.amount || ""}
							onChange={onChange}
							required
							autoComplete="off"
						/>

						<button
							type="submit"
							className="mt-5 w-full bg-primary text-white rounded-lg font-semibold text-[20px] p-2 hover:bg-primary-hover"
						>
							Add transaction
						</button>
					</form>

					<button onClick={() => setModalIsOpen(false)}>Close Modal</button>
				</ReactModal>
			)}
		</div>
	);
};

export default TransactionModal;
