import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import AuthContext from '../../context/authContext';

const Header = () => {
	const context = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		context.logout();
		navigate('/login');
	};

	return (
		<header className={styles.header}>
			<div className="wrapper">
				<h1>Serwis komputerowy</h1>
				<p>{context.userCredentials.username}</p>
				<button onClick={handleLogOut}>Wyloguj</button>
				<nav>
					<ul>
						<li>
							<NavLink
								className={nav =>
									nav.isActive ? styles.active : ''
								}
								to="/serwis">
								Serwis
							</NavLink>
						</li>
						<li>
							<NavLink
								className={nav =>
									nav.isActive ? styles.active : ''
								}
								to="/czesci">
								Części zamienne
							</NavLink>
						</li>
						<li>
							<NavLink
								className={nav =>
									nav.isActive ? styles.active : ''
								}
								to="/klienci">
								Klienci
							</NavLink>
						</li>
						<li>
							<NavLink
								className={nav =>
									nav.isActive ? styles.active : ''
								}
								to="/platnosci">
								Płatności
							</NavLink>
						</li>
						{context.userCredentials.type === 3 ? (
							<li>
								<NavLink
									className={nav =>
										nav.isActive ? styles.active : ''
									}
									to="/pracownicy">
									Konto
								</NavLink>
							</li>
						) : null}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
