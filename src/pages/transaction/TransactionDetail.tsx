import { useLocation } from "react-router-dom";
import { transactionForm } from "../../components/TransactionModal";

const TransactionDetail = () => {
	const location = useLocation();
	const transaction: transactionForm = location.state.transaction;

	return (
		<div>
			<div>{transaction.name}</div>
			<div>{transaction.amount}</div>
			<div>{transaction.category}</div>
		</div>
	);
};

export default TransactionDetail;
