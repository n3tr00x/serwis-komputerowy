import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminPanelTable from '../components/Tables/AdminPanelTable';

const AdminPanel = () => {
	const [employees, setEmployees] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const getEmployees = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/employees`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setEmployees(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getEmployees();
	}, [getEmployees]);

	return (
		<section>
			<div className="wrapper">
				<h1>Panel administracyjny</h1>
				<Link to="/pracownicy/dodaj">Dodaj pracownika</Link>
				{isLoaded ? (
					<AdminPanelTable data={employees} />
				) : (
					<p>ŁADOWANIE</p>
				)}
			</div>
		</section>
	);
};

export default AdminPanel;
