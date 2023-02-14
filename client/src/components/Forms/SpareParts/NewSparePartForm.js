import { useState } from 'react';
import Input from '../../Input';
import { useNavigate } from 'react-router-dom';
import DeviceType from '../../DeviceType';
import Producers from '../../Producers';

const NewSparePart = () => {
	const [inputs, setInputs] = useState({
		name: '',
		type: '',
		producer: '',
		serialNumber: '',
	});
	const navigate = useNavigate();

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const addSparePart = async data => {
		try {
			await fetch(`http://localhost:3001/spare-parts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(response => {
				navigate('/czesci');
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		if (
			inputs.name === '' ||
			inputs.producer === '' ||
			inputs.type === '' ||
			inputs.serialNumber
		) {
			alert('Wprowadź poprawne dane');
		} else {
			addSparePart(inputs);
			setInputs({});
			event.target.reset();
			alert('Pomyślnie dodano część');
		}
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<Input
				label="Nazwa części"
				input={{
					id: `add-input-name`,
					type: 'text',
					name: 'name',
					defaultValue: inputs.name,
					onChange: handleChange,
				}}
			/>
			<DeviceType
				label="Typ"
				device={{
					id: 'add-input-type',
					name: 'type',
					onChange: handleChange,
				}}
			/>
			<Producers
				label="Producent"
				producers={{
					id: 'add-input-producers',
					name: 'producer',
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer seryjny"
				input={{
					id: `add-input-serial-number`,
					type: 'text',
					name: 'serialNumber',
					defaultValue: inputs.serialNumber,
					onChange: handleChange,
				}}
			/>
			<button type="submit">Dodaj</button>
		</form>
	);
};

export default NewSparePart;
