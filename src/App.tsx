import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Deals from "./pages/Deals";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import History from "./pages/History";
import TransactionDetail from "./pages/transaction/TransactionDetail";

function App() {
	return (
		<div className="max-w-lg ">
			{/* navbar in here later */}
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Login />}
					></Route>
					<Route
						path="/test"
						element={<Test />}
					></Route>
					<Route
						path="/register"
						element={<Register />}
					></Route>

					<Route
						path="/home"
						element={
							<PrivateRoute>
								<AppLayout>
									<Home />
								</AppLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/history"
						element={
							<PrivateRoute>
								<AppLayout>
									<History />
								</AppLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/transaction/:transactionId"
						element={
							<PrivateRoute>
								<AppLayout>
									<TransactionDetail />
								</AppLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/deals"
						element={
							<PrivateRoute>
								<AppLayout>
									<Deals />
								</AppLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/insights"
						element={
							<PrivateRoute>
								<AppLayout>
									<Insights />
								</AppLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<AppLayout>
									<Profile />
								</AppLayout>
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
