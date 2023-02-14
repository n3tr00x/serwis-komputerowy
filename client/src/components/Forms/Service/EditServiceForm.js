import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Input';
import Producers from '../../Producers';
import DeviceType from '../../DeviceType';
import Status from '../../Status';
import CustomersList from '../../CustomersList';
import Textarea from '../../Textarea';
import Payments from '../../Payments';

const EditServiceForm = () => {
	const [inputs, setInputs] = useState({});
	const [customers, setCustomers] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	const getRepairs = useCallback(async id => {
		try {
			const response = await fetch(`http://localhost:3001/repairs/${id}`);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setInputs(data[0]);
		} catch (err) {
			console.error(err);
		}
	}, []);

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

	const editRepair = async data => {
		try {
			await fetch(`http://localhost:3001/repairs/${id}`, {
				method: 'PUT',
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
		// console.log(inputs);
	};

	const removeRepair = async id => {
		try {
			await fetch(`http://localhost:3001/repairs/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(response => {
				navigate('/serwis');
			});
		} catch (error) {
			console.error(error);
		}
	};

	const completeRepair = async () => {
		try {
			await fetch(`http://localhost:3001/payments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id_repair: inputs.id_repair,
					id_customer: inputs.id_customer,
					payments: inputs.payments,
				}),
			}).then(response => {
				navigate('/serwis');
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRepairs(id);
		getCustomers();
	}, [getCustomers, getRepairs, id]);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleEditSubmit = event => {
		event.preventDefault();
		editRepair(inputs);
		alert('Pomyślnie edytowano dane!');
	};

	const handleRemoveRepair = event => {
		event.preventDefault();
		if (window.confirm('Czy na pewno chcesz usunąć zlecenie?')) {
			removeRepair(id);
		}
	};

	const handlePayments = event => {
		event.preventDefault();
		completeRepair();
	};

	const convertDate = date => {
		const dt = new Date(date);
		return dt.toISOString().replace('Z', '');
	};

	return (
		<form onSubmit={handleEditSubmit}>
			<Input
				label="ID"
				input={{
					id: `edit-input-id`,
					type: 'number',
					disabled: true,
					defaultValue: inputs.id_repair,
				}}
			/>
			<Input
				label="Pracownik"
				input={{
					id: `edit-input-id`,
					type: 'text',
					disabled: true,
					defaultValue: inputs.worker,
				}}
			/>
			<Input
				label="Data przyjęcia"
				input={{
					id: `edit-input-repair-date`,
					type: 'datetime-local',
					name: 'repair_date',
					disabled: true,
					defaultValue: inputs.repair_date
						? convertDate(inputs.repair_date)
						: '',
					onChange: handleChange,
				}}
			/>
			<Input
				label="Nazwa"
				input={{
					id: `edit-input-name`,
					type: 'text',
					name: 'name',
					defaultValue: inputs.name,
					onChange: handleChange,
				}}
			/>
			<CustomersList
				label="Klient"
				customers={customers}
				optionValue={inputs.name_and_surname}
				attributes={{
					id: 'edit-input-customers',
					name: 'id_customer',
					onChange: handleChange,
				}}
			/>
			<Producers
				label="Producent"
				optionValue={inputs.producer}
				producers={{
					id: 'edit-input-producer',
					name: 'id_producer',
					onChange: handleChange,
				}}
			/>
			<DeviceType
				label="Typ"
				defaultValue={inputs.id_device_type}
				optionValue={inputs.type}
				device={{
					id: 'edit-input-type',
					name: 'id_device_type',
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer seryjny"
				input={{
					id: `edit-input-serial-number`,
					type: 'text',
					name: 'serial_number',
					defaultValue: inputs.serial_number,
					onChange: handleChange,
				}}
			/>
			<Textarea
				label="Opis"
				attributes={{
					id: 'edit-input-desc',
					name: 'description',
					defaultValue: inputs.description,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Cena"
				input={{
					id: `edit-input-price`,
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
			<Input
				label="Data naprawy"
				input={{
					id: `edit-input-end-repair`,
					type: 'datetime-local',
					name: 'end_repair_date',
					defaultValue: inputs.end_repair_date
						? convertDate(inputs.end_repair_date)
						: '',
					onChange: handleChange,
				}}
			/>
			<Status
				label="Status"
				defaultValue={inputs.status}
				optionValue={inputs.status}
				status={{
					id: 'edit-input-status',
					name: 'status',
					onChange: handleChange,
				}}
			/>
			{inputs.status === 'gotowy do odebrania' ? (
				<Payments
					label="Płatność"
					defaultValue={inputs.payments}
					payment={{
						id: 'payments',
						name: 'payments',
						onChange: handleChange,
					}}
				/>
			) : null}
			<button type="submit">Edytuj</button>
			<button type="button" onClick={handleRemoveRepair}>
				Usuń
			</button>
			{inputs.status === 'gotowy do odebrania' &&
			inputs.payments !== '' ? (
				<button type="button" onClick={handlePayments}>
					Zakończ zlecenie
				</button>
			) : null}
		</form>
	);
};

export default EditServiceForm;
