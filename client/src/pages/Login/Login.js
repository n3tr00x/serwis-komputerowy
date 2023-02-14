import LoginForm from '../../components/Forms/Login/LoginForm';
import './Login.css';

const Login = () => {
	return (
		<div className="login-container">
			<header>
				<h1>Logowanie Serwis Reparex</h1>
			</header>
			<main>
				<LoginForm />
			</main>
		</div>
	);
};

export default Login;
