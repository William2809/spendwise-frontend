import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FormEvent, useEffect, useState } from "react";
import authService from "../utils/auth/AuthService";
import LoadingScreen from "../components/LoadingScreen";

interface Budget {
	weeklyBudget: number | undefined;
}

function Budget() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<Budget>({
		weeklyBudget: undefined,
	});
	const [isLoading, setIsLoading] = useState(false);

	const returnBack = () => {
		return navigate(-1);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		await authService.setbudget(formData.weeklyBudget);
		setIsLoading(false);
	};

	const getBudget = async () => {
		const result = await authService.getbudget();
		setFormData({ weeklyBudget: result.weeklyBudget });
	};

	useEffect(() => {
		getBudget();
	}, []);

	return (
		<div className="px-5 pt-4 pb-20">
			{isLoading && <LoadingScreen />}
			<div className="flex items-center justify-between text-primary-muted">
				<div className="flex items-center gap-3">
					<MdArrowBack
						size="28"
						onClick={returnBack}
					/>
					<div className="text-[24px] font-semibold">Weekly Budget</div>
				</div>
			</div>

			<form
				onSubmit={onSubmit}
				className="pt-10"
			>
				<input
					type="text"
					name="weeklyBudget"
					placeholder="Enter the weekly budget"
					autoComplete="off"
					className="text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-full p-4"
					value={formData.weeklyBudget}
					onChange={onChange}
					required
				/>
				<button
					type="submit"
					className="bg-primary hover:bg-primary-hover text-white text-[20px] font-semibold rounded-lg py-3 mt-10  w-full"
				>
					Set Budget
				</button>
			</form>
		</div>
	);
}

export default Budget;
