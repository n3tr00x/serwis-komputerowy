import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeviceType from '../../DeviceType';
import Input from '../../Input';
import Producers from '../../Producers';

const EditSparePartForm = () => {
	const [inputs, setInputs] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const getSparePart = useCallback(async id => {
		try {
			const response = await fetch(
				`http://localhost:3001/spare-parts/${id}`
			);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setInputs(data[0]);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const editSparePart = async data => {
		try {
			await fetch(`http://localhost:3001/spare-parts/${id}`, {
				method: 'PUT',
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

	const removeSparePart = async id => {
		try {
			await fetch(`http://localhost:3001/spare-parts/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(response => {
				navigate('/czesci');
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getSparePart(id);
	}, [getSparePart, id]);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleEditSubmit = event => {
		event.preventDefault();
		editSparePart(inputs);
		alert('Pomyślnie edytowano dane!');
	};

	const handleRemoveSparePart = event => {
		event.preventDefault();
		if (window.confirm('Czy na pewno chcesz usunąć część zamienną?')) {
			removeSparePart(id);
		}
	};

	return (
		<form onSubmit={handleEditSubmit}>
			<Input
				label="ID"
				input={{
					id: `edit-input-id`,
					type: 'number',
					disabled: true,
					defaultValue: inputs.id_spare_parts,
				}}
			/>
			<Input
				label="Nazwa części"
				input={{
					id: `edit-input-name`,
					type: 'name',
					name: 'name',
					defaultValue: inputs.name,
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
			<Producers
				label="Producent"
				defaultValue={inputs.id_producers}
				optionValue={inputs.producer}
				producers={{
					id: 'edit-input-producer',
					name: 'id_producer',
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer seryjny"
				input={{
					id: `edit-input-serial-number`,
					name: 'serial_number',
					type: 'name',
					defaultValue: inputs.serial_number,
				}}
			/>
			<button type="submit">Edytuj</button>
			<button type="button" onClick={handleRemoveSparePart}>
				Usuń
			</button>
		</form>
	);
};

export default EditSparePartForm;
