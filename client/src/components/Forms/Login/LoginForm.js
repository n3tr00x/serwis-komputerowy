import { useContext, useState } from 'react';
import './LoginForm.css';
import AuthContext from '../../../context/authContext';

const LoginForm = () => {
	const [user, setUser] = useState({ username: '', password: '' });
	const context = useContext(AuthContext);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setUser(values => ({ ...values, [name]: value }));
	};

	const handleSubmit = event => {
		event.preventDefault();
		context.login(user.username, user.password);
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="input">
				<label htmlFor="username">Użytkownik</label>
				<input
					id="username"
					className="username"
					name="username"
					onChange={handleChange}
				/>
			</div>
			<div className="input">
				<label htmlFor="password">Hasło</label>
				<input
					type="password"
					id="password"
					className="password"
					name="password"
					onChange={handleChange}
				/>
			</div>
			<button type="submit" className="submit-btn">
				Wyślij
			</button>
		</form>
	);
};

export default LoginForm;
