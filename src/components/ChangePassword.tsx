import { FC, useState } from "react";
import { MdVisibilityOff, MdVisibility, MdArrowBackIos } from "react-icons/md";

interface Props {
	setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
	openChangePassword: boolean;
}

const ChangePassword: FC<Props> = ({
	setOpenChangePassword,
	openChangePassword,
}): JSX.Element => {
	const user = JSON.parse(localStorage.getItem("user")!);
	const [visible, setVisible] = useState(true);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
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
	return (
		<div className="mt-10 flex flex-col flex-grow">
			<button
				className="p-2 mb-5 text-[20px] rounded-lg text-black flex gap-1 items-center font-semibold cursor-pointer w-min"
				onClick={cancel}
			>
				<MdArrowBackIos size="20" />
				<div>Return</div>
			</button>
			{user.password ? (
				<form className="flex flex-col justify-between h-full">
					<div className="relative flex items-center">
						<input
							type={!visible ? "text" : "password"}
							name="password"
							placeholder="Set new password"
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
					<div className="w-full text-white bg-primary rounded-lg flex items-center py-3 px-3 cursor-pointer hover:bg-primary-muted justify-center text-[20px] font-semibold">
						<div>Set Password</div>
					</div>
				</form>
			) : (
				<form className="flex flex-col justify-between h-full">
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
					</div>
					<div className="w-full text-white bg-primary rounded-lg flex items-center py-3 px-3 cursor-pointer hover:bg-primary-muted justify-center text-[20px] font-semibold">
						<div>Change Password</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default ChangePassword;
