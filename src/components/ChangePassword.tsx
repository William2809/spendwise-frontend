import { FC, useEffect, useState, FormEvent } from "react";
import { MdVisibilityOff, MdVisibility, MdArrowBackIos } from "react-icons/md";
import authService from "../utils/auth/AuthService";
import LoadingScreen from "./LoadingScreen";

interface Props {
	setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
	openChangePassword: boolean;
}

const ChangePassword: FC<Props> = ({
	setOpenChangePassword,
	openChangePassword,
}): JSX.Element => {
	const [visible, setVisible] = useState(true);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [hasPassword, setHasPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const reset = () => {
		setPassword("");
		setNewPassword("");
	};

	const resetStatus = () => {
		setError(null);
		setSuccess(null);
	};

	const togglePassword = () => {
		setVisible(!visible);
	};
	const cancel = () => {
		setOpenChangePassword(!openChangePassword);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangeNewPass = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const checkPassword = async () => {
		setIsLoading(true);
		const status = await authService.checkPassword();
		setHasPassword(status);
		setIsLoading(false);
	};

	const handleNewPassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		reset();
		try {
			setIsLoading(true);
			const status: any = await authService.setPassword(newPassword, null);
			setSuccess(status.message);
			setIsLoading(false);
			checkPassword();
			reset();
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetStatus();
		setIsLoading(true);
		try {
			const status: any = await authService.setPassword(newPassword, password);
			setSuccess(status.message);
			checkPassword();
			reset();
		} catch (error: any) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		checkPassword();
		reset();
	}, []);

	return (
		<div className="mt-10 flex flex-col flex-grow">
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="flex flex-col flex-grow pb-[80px]">
					<button
						className="p-2 mb-5 text-[20px] rounded-lg text-black flex gap-1 items-center font-semibold cursor-pointer w-min"
						onClick={cancel}
					>
						<MdArrowBackIos size="20" />
						<div>Return</div>
					</button>

					{success && <p className="text-primary py-2">{success}</p>}

					{!hasPassword ? (
						<form
							onSubmit={handleNewPassword}
							className="flex flex-col justify-between h-full"
						>
							<div className="relative flex items-center">
								<input
									type={!visible ? "text" : "password"}
									name="password"
									placeholder="Set new password"
									autoComplete="off"
									className=" text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-full p-4"
									value={newPassword}
									onChange={onChangeNewPass}
									required
								/>
								<span onClick={togglePassword}>
									{visible ? (
										<MdVisibilityOff
											className=" absolute transform -translate-y-1/2  right-5"
											size={20}
										/>
									) : (
										<MdVisibility
											className="absolute transform -translate-y-1/2 right-5"
											size={20}
										/>
									)}
								</span>
							</div>
							{error && <p className="text-[#F61C1C] py-2">{error}</p>}

							<button
								type="submit"
								className="w-full text-white bg-primary rounded-lg flex items-center py-3 px-3 cursor-pointer hover:bg-primary-muted justify-center text-[20px] font-semibold"
							>
								<div>Set Password</div>
							</button>
						</form>
					) : (
						<form
							onSubmit={handleChangePassword}
							className="flex flex-col justify-between h-full"
						>
							<div className="flex flex-col gap-8">
								<div className="relative flex items-center">
									<input
										type={!visible ? "text" : "password"}
										name="password"
										placeholder="Current Password"
										autoComplete="off"
										className=" text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-full p-4"
										value={password}
										onChange={onChange}
										required
									/>
									<span onClick={togglePassword}>
										{visible ? (
											<MdVisibilityOff
												className=" absolute transform -translate-y-1/2  right-5"
												size={20}
											/>
										) : (
											<MdVisibility
												className="absolute transform -translate-y-1/2 right-5"
												size={20}
											/>
										)}
									</span>
								</div>

								<div className="relative flex items-center">
									<input
										type={!visible ? "text" : "password"}
										name="password"
										placeholder="Set new password"
										autoComplete="off"
										className=" text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-full p-4"
										value={newPassword}
										onChange={onChangeNewPass}
										required
									/>
									<span onClick={togglePassword}>
										{visible ? (
											<MdVisibilityOff
												className=" absolute transform -translate-y-1/2  right-5"
												size={20}
											/>
										) : (
											<MdVisibility
												className="absolute transform -translate-y-1/2 right-5"
												size={20}
											/>
										)}
									</span>
								</div>
								{error && <p className="text-[#F61C1C]">{error}</p>}

								<button
									type="submit"
									className="w-full text-white bg-primary rounded-lg flex items-center py-3 px-3 cursor-pointer hover:bg-primary-muted justify-center text-[20px] font-semibold"
								>
									<div>Change Password</div>
								</button>
							</div>
						</form>
					)}
				</div>
			)}
		</div>
	);
};

export default ChangePassword;
