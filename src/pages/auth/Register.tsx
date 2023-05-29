import React, { FormEvent, useEffect, useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../utils/auth/AuthService";
import useAuthStatus from "../../hooks/useAuthStatus";
import Google from "../../utils/auth/GoogleAuth";
import LoadingScreen from "../../components/LoadingScreen";

export interface RegisterForm {
	name: string;
	email: string;
	password: string;
}

function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [visible, setVisible] = useState(true);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState<RegisterForm>({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { loggedIn } = useAuthStatus();
	useEffect(() => {
		if (loggedIn) {
			navigate("/home");
		}
	}, [loggedIn]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const togglePassword = () => {
		setVisible(!visible);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = formData;

		try {
			setIsLoading(true);
			await authService.register(userData);
			setIsLoading(false);
		} catch (error: any) {
			setError(error.message);
		}
		navigate("/home");
	};

	return (
		<div>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="flex flex-col justify-center items-center pt-[100px]">
					<div>
						<div className="flex items-center gap-4">
							<img
								className="w-[80px]"
								src="/logo.svg"
								alt=""
							/>
							<h1 className="text-primary text-6xl font-bold">Register</h1>
						</div>
						<div className="mt-4">
							<p>
								Already have an account?{" "}
								<Link
									className="text-primary"
									to="/"
								>
									Login here
								</Link>
							</p>
						</div>
					</div>
					<form
						onSubmit={onSubmit}
						className="mt-16 flex flex-col gap-4"
					>
						<input
							type="text"
							name="name"
							placeholder="Enter your name"
							autoComplete="off"
							className="text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-[310px] p-4"
							value={formData.name}
							onChange={onChange}
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							autoComplete="off"
							className="text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-[310px] p-4"
							value={formData.email}
							onChange={onChange}
							required
						/>
						<div className="relative flex items-center">
							<input
								type={!visible ? "text" : "password"}
								name="password"
								placeholder="Enter your Password"
								autoComplete="off"
								className=" text-black placeholder:text-disabled bg-input-bg outline-none border-none rounded-lg h-[60px] w-[310px] p-4"
								value={formData.password}
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
						{error && <p className="text-[#F61C1C]">{error}</p>}

						<div className="mt-10">
							{/* sign in with google */}
							<Google.GoogleAuth></Google.GoogleAuth>
							<button
								type="submit"
								className="mt-5 w-[310px] bg-primary text-white rounded-lg font-semibold text-[24px] p-2 hover:bg-primary-hover"
							>
								Create account
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default Register;
