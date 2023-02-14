import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CustomerTable from '../components/Tables/CustomerTable';

const Customers = () => {
	const [customers, setCustomers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const getCustomers = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/customers`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setCustomers(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getCustomers();
	}, [getCustomers]);

	return (
		<section>
			<h1>Klienci</h1>
			<Link to="/klienci/dodaj/">Dodaj klienta</Link>
			{isLoaded ? <CustomerTable data={customers} /> : <p>ŁADOWANIE</p>}
		</section>
	);
};

export default Customers;
