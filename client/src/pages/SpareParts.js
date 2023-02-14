import React, { useState, useEffect, useCallback } from 'react';
import SparePartsTable from '../components/Tables/SparePartsTable';
import { Link } from 'react-router-dom';

const SpareParts = () => {
	const [hardware, setHardware] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const getSpareParts = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/spare-parts`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setHardware(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getSpareParts();
	}, [getSpareParts]);

	return (
		<section>
			<div className="wrapper">
				<h1>Części zamienne</h1>
				<Link to="/czesci/dodaj">Dodaj część</Link>
				{isLoaded ? (
					<SparePartsTable data={hardware} />
				) : (
					<p>ŁADOWANIE</p>
				)}
			</div>
		</section>
	);
};

export default SpareParts;
