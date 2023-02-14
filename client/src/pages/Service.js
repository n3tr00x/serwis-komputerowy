import React, { useCallback, useState, useEffect } from 'react';
import ServiceTable from '../components/Tables/ServiceTable';
import { Link } from 'react-router-dom';

const Service = () => {
	const [repairs, setRepairs] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const getRepairs = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/repairs`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setRepairs(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getRepairs();
	}, [getRepairs]);

	return (
		<section>
			<h1>Serwis</h1>
			<Link to="/serwis/dodaj">Dodaj zlecenie</Link>
			{isLoaded ? <ServiceTable data={repairs} /> : <p>ŁADOWANIE</p>}
		</section>
	);
};

export default Service;
