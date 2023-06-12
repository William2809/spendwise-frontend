import { useState, useEffect } from "react";

import { transactionForm } from "../components/TransactionModal";
import transactionService from "../utils/transaction/transactionService";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdClose, MdEdit } from "react-icons/md";
import Transactions from "../components/Transactions";

function History() {
	const [transactions, setTransactions] = useState<transactionForm[]>([]);
	const [edit, setEdit] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const result = await transactionService.getTransaction();
			setTransactions(result);
		};

		fetchData();
	}, [refreshKey]);

	const navigate = useNavigate();

	const returnBack = () => {
		return navigate(-1);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};

	return (
		<div className="px-5 pt-4 pb-20">
			<div className="flex items-center justify-between text-primary-muted">
				<div className="flex items-center gap-3">
					<MdArrowBack
						size="28"
						onClick={returnBack}
					/>
					<div className="text-[24px] font-semibold">Transaction History</div>
				</div>
				<div
					className="cursor-pointer"
					onClick={toggleEdit}
				>
					{edit ? <MdClose size="28"></MdClose> : <MdEdit size="28"></MdEdit>}
				</div>
			</div>

			<div className="pt-10">
				<Transactions
					transactions={transactions}
					limit={undefined}
					edit={edit}
					setRefreshKey={setRefreshKey}
					refreshKey={refreshKey}
				/>
			</div>
		</div>
	);
}

export default History;
