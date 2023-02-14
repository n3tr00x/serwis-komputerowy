import NewServiceForm from '../components/Forms/Service/NewServiceForm';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const NewService = () => {
	const navigate = useNavigate();

	const isCustomerExists = useCallback(() => {
		if (window.confirm('Czy utworzyć nowego klienta?')) {
			navigate('/klienci/dodaj');
		}
	}, [navigate]);

	useEffect(() => {
		isCustomerExists();
	}, [isCustomerExists]);

	return (
		<section>
			<h1>Nowe zlecenie</h1>
			<NewServiceForm />
		</section>
	);
};

export default NewService;
