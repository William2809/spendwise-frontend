import { Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

interface PrivateRouteProps {
	children: React.ReactElement | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	if (checkingStatus) {
		return <div>Loading...</div>;
	}
	return loggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
