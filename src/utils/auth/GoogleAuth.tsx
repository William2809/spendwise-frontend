import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import googleSignIn from "./AuthService";
import authService from "./AuthService";
import { useNavigate } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

interface DecodedData {
	name: string;
	email: string;
	picture: string;
}

const loadScript = (src: string): Promise<void> =>
	new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) return resolve();
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve();
		script.onerror = (err) => reject(err);
		document.body.appendChild(script);
	});

declare var google: any;

const GoogleAuth = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const src = "https://accounts.google.com/gsi/client";
		const id = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
		loadScript(src)
			.then(() => {
				/*global google*/
				google.accounts.id.initialize({
					client_id: id,
					callback: handleCredentialResponse,
				});
				google.accounts.id.renderButton(document.getElementById("buttonDiv")!, {
					shape: "square",
					theme: "outline",
					size: "large",
					width: "310px",
					text: "continue_with",
					type: "standard",
				});
				google.accounts.id.prompt();
			})
			.catch(console.error);

		return () => {
			const scriptTag = document.querySelector(`script[src="${src}"]`);
			if (scriptTag) document.body.removeChild(scriptTag);
		};
	}, []);

	const handleCredentialResponse = async (response: { credential: string }) => {
		const decoded: DecodedData = jwt_decode(response.credential);
		const userData = {
			name: decoded.name,
			email: decoded.email,
			picture: decoded.picture,
		};

		await authService.googleSignIn(userData);
		navigate("/home");
	};

	return (
		<div
			id="buttonDiv"
			className=""
		></div>
	);
};

const Google = {
	GoogleAuth,
};

export default Google;
