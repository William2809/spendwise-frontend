import {
	MdArrowForwardIos,
	MdHistory,
	MdOutlineLogout,
	MdPassword,
} from "react-icons/md";
import nullpng from "../assets/null.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../utils/auth/AuthService";
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";

function Profile() {
	const user = JSON.parse(localStorage.getItem("user")!);
	const [openChangePassword, setOpenChangePassword] = useState(false);
	const navigate = useNavigate();
	const logout = () => {
		authService.logout();
		navigate("/");
	};

	const handleChangePasswordClick = () => {
		setOpenChangePassword(!openChangePassword);
	};

	return (
		<div className="px-5 pt-4 max-w-lg profile-height flex flex-col overflow-auto">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center gap-3">
					<img
						src={user.picture ? `${user.picture}` : nullpng}
						className="rounded-full h-10"
						alt="User Profile"
					/>
					<h2 className="text-primary-muted font-semibold text-base">
						{user.name}
					</h2>
				</div>
			</div>

			<div className="mt-10 flex items-center gap-5">
				<img
					src={user.picture ? `${user.picture}` : nullpng}
					className="rounded-full h-20"
					alt="User Profile"
				/>
				<div className="flex flex-col gap-1">
					<div className="text-[20px] font-semibold">{user.name}</div>
					<div className="">{user.email}</div>
				</div>
			</div>

			{/* menu */}
			{openChangePassword ? (
				<ChangePassword
					openChangePassword={openChangePassword}
					setOpenChangePassword={setOpenChangePassword}
				/>
			) : (
				<div className="mt-10 flex flex-col justify-between flex-grow">
					<div className="flex flex-col gap-3">
						<div
							className="w-full bg-secondary rounded-lg flex justify-between items-center py-3 px-3 cursor-pointer hover:bg-primary hover:text-white"
							onClick={handleChangePasswordClick}
						>
							<div className="flex gap-5 items-center">
								<MdPassword size="28"></MdPassword>
								<div>Change Password</div>
							</div>
							<MdArrowForwardIos></MdArrowForwardIos>
						</div>
						<Link
							to="/history"
							className="w-full bg-secondary rounded-lg flex justify-between items-center py-3 px-3 cursor-pointer hover:bg-primary hover:text-white"
						>
							<div className="flex gap-5 items-center">
								<MdHistory size="28"></MdHistory>
								<div>Transaction history</div>
							</div>
							<MdArrowForwardIos></MdArrowForwardIos>
						</Link>
					</div>
					<div
						className="w-full mb-[80px] text-white bg-primary rounded-lg  items-center py-3 px-3 cursor-pointer hover:bg-primary-muted"
						onClick={logout}
					>
						<div className="flex gap-5 items-center">
							<MdOutlineLogout size="28"></MdOutlineLogout>
							<div>Log out</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Profile;
