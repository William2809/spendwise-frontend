import React from "react";
import authService from "../utils/auth/AuthService";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const logout = () => {
		authService.logout();
		navigate("/");
	};

	return (
		<div>
			<div>Home, user already logged in</div>
			<div>
				<button onClick={logout}>Log out</button>
			</div>
		</div>
	);
}

export default Home;
