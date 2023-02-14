import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Service from './pages/Service';
import SpareParts from './pages/SpareParts';
import Customers from './pages/Customers';
import CustomerDetails from './pages/CustomerDetails';
import NewCustomer from './pages/NewCustomer';
import NewSparePart from './pages/NewSparePart';
import SparePartDetails from './pages/SparePartDetails';
import ServiceDetails from './pages/ServiceDetails';
import NewService from './pages/NewService';
import AuthContext from './context/authContext';
import Login from './pages/Login/Login';
import AdminPanel from './pages/AdminPanel';
import NewEmployee from './pages/NewEmployee';
import AccountDetails from './pages/AccountDetails';
import Payments from './pages/Payments';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [userCredentials, setUserCredentials] = useState({});

	const navigate = useNavigate();

	const login = async (username, password) => {
		try {
			await fetch(`http://localhost:3001/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			})
				.then(response => {
					if (response.ok) return response.json();
				})
				.then(data => {
					console.log(data);
					if (data.info) {
						setIsLogin(true);
						setUserCredentials({ ...data });
						navigate('/serwis');
					} else {
						alert('niepoprawne dane');
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	const logOut = () => {
		setIsLogin(!isLogin);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isLogin,
				login: login,
				logout: logOut,
				userCredentials: userCredentials,
			}}>
			<div className="app">
				{!isLogin ? (
					<main>
						<Routes>
							<Route
								path="/*"
								element={<Navigate to="/login" />}
							/>
							<Route path="/login" element={<Login />}></Route>
						</Routes>
					</main>
				) : (
					<>
						<Header />
						<main>
							<div className="wrapper">
								<Routes>
									<Route
										path="/"
										element={<Navigate to="/serwis" />}
									/>
									<Route
										path="/serwis"
										element={<Service />}
									/>
									<Route
										path="/serwis/dodaj"
										element={<NewService />}
									/>
									<Route
										path="/serwis/:id"
										element={<ServiceDetails />}
									/>
									<Route
										path="/czesci"
										element={<SpareParts />}
									/>
									<Route
										path="/czesci/dodaj"
										element={<NewSparePart />}
									/>
									<Route
										path="/czesci/:id"
										element={<SparePartDetails />}
									/>
									<Route
										path="/klienci"
										element={<Customers />}
									/>
									<Route
										path="/klienci/:id"
										element={<CustomerDetails />}
									/>
									<Route
										path="/klienci/dodaj"
										element={<NewCustomer />}
									/>
									<Route
										path="/pracownicy"
										element={<AdminPanel />}
									/>
									<Route
										path="/pracownicy/:id"
										element={<AccountDetails />}
									/>
									<Route
										path="/pracownicy/dodaj"
										element={<NewEmployee />}
									/>
									<Route
										path="/platnosci"
										element={<Payments />}
									/>
								</Routes>
							</div>
						</main>
					</>
				)}
			</div>
		</AuthContext.Provider>
	);
}

export default App;
