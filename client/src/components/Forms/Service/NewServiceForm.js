import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../Input';
import Producers from '../../Producers';
import DeviceType from '../../DeviceType';
import Textarea from '../../Textarea';
import CustomersList from '../../CustomersList';
import AuthContext from '../../../context/authContext';

const NewServiceForm = () => {
	const context = useContext(AuthContext);
	const [inputs, setInputs] = useState({
		name: '',
		repair_date: '',
		id_customer: '',
		id_producer: '',
		id_device_type: '',
		serial_number: '',
		description: '',
		price: '',
		comment: '',
		idEmployee: context.userCredentials.employee,
	});
	const [customers, setCustomers] = useState([]);

	const navigate = useNavigate();

	const getCustomers = useCallback(async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/customers-base`
			);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setCustomers(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const addService = async data => {
		try {
			await fetch(`http://localhost:3001/repairs`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(response => {
				navigate('/serwis');
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleSubmit = event => {
		if (
			inputs.name === '' ||
			inputs.repair_date === '' ||
			inputs.id_customer === '' ||
			inputs.id_producer === '' ||
			inputs.id_device_type === '' ||
			inputs.serial_number === '' ||
			inputs.description === '' ||
			inputs.price === ''
		) {
			alert('Wprowadź poprawne dane');
		} else {
			event.preventDefault();
			addService(inputs);
			setInputs({});
			alert('Pomyślnie dodano zlecenie!');
		}
	};

	const convertDate = date => {
		const dt = new Date(date);
		return dt.toISOString().replace('Z', '');
	};

	useEffect(() => {
		getCustomers();
	}, [getCustomers]);

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Nazwa"
				input={{
					id: `add-input-name`,
					type: 'text',
					name: 'name',
					defaultValue: inputs.name,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Data przyjęcia"
				input={{
					id: `add-input-repair-date`,
					type: 'datetime-local',
					name: 'repair_date',
					defaultValue: inputs.repair_date
						? convertDate(inputs.repair_date)
						: '',
					onChange: handleChange,
				}}
			/>
			<CustomersList
				label="Klient"
				customers={customers}
				attributes={{
					id: 'add-input-customers',
					name: 'id_customer',
					onChange: handleChange,
				}}
			/>
			<Producers
				label="Producent"
				producers={{
					id: 'add-input-producer',
					name: 'id_producer',
					onChange: handleChange,
				}}
			/>
			<DeviceType
				label="Typ"
				device={{
					id: 'add-input-type',
					name: 'id_device_type',
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer seryjny"
				input={{
					id: `add-input-serial-number`,
					type: 'text',
					name: 'serial_number',
					defaultValue: inputs.serial_number,
					onChange: handleChange,
				}}
			/>
			<Textarea
				label="Opis"
				attributes={{
					id: 'add-input-desc',
					name: 'description',
					defaultValue: inputs.description,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Cena"
				input={{
					id: `add-input-price`,
					type: 'number',
					name: 'price',
					step: '0.01',
					defaultValue: inputs.price,
					onChange: handleChange,
				}}
			/>
			<Textarea
				label="Komentarz"
				attributes={{
					id: 'edit-input-comment',
					name: 'comment',
					defaultValue: inputs.comment,
					onChange: handleChange,
				}}
			/>
			<button type="submit">Dodaj zlecenie</button>
		</form>
	);
};

export default NewServiceForm;
