import React, { useCallback, useState, useEffect } from 'react';
import PaymentsTable from '../components/Tables/PaymentsTable';

const Payments = () => {
	const [payments, setPayments] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const getPayments = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/payments`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setPayments(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getPayments();
	}, [getPayments]);

	return (
		<section>
			<h1>Płatności</h1>
			{isLoaded ? <PaymentsTable data={payments} /> : <p>ŁADOWANIE</p>}
		</section>
	);
};

export default Payments;
