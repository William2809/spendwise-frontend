import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

function App() {
	return (
		<div>
			{/* navbar in here later */}
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Login />}
					></Route>
					<Route
						path="/register"
						element={<Register />}
					></Route>

					<Route
						path="/home"
						element={<PrivateRoute />}
					>
						<Route
							path="/home"
							element={<Home />}
						/>
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
