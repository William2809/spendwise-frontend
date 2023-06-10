import { useState, useEffect } from "react";

import { transactionForm } from "../components/TransactionModal";
import transactionService from "../utils/transaction/transactionService";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Transactions from "../components/Transactions";

function History() {
	const [transactions, setTransactions] = useState<transactionForm[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await transactionService.getTransaction();
			setTransactions(result);
		};

		fetchData();
	}, []);

	const navigate = useNavigate();

	const returnBack = () => {
		return navigate(-1);
	};
	return (
		<div className="px-5 pt-4 pb-20">
			<div className="flex items-center gap-3 text-primary-muted">
				<MdArrowBack
					size="28"
					onClick={returnBack}
				/>
				<div className="text-[24px] font-semibold">Transaction History</div>
			</div>

			<div className="pt-10">
				<Transactions
					transactions={transactions}
					limit={undefined}
				/>
			</div>
		</div>
	);
}

export default History;
