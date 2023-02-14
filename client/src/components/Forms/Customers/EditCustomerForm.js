import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Input';
import Gender from '../../Gender';
import Region from '../../Region';

const EditCustomerForm = () => {
	const [inputs, setInputs] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const getCustomer = useCallback(async id => {
		try {
			const response = await fetch(
				`http://localhost:3001/customers/${id}`
			);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setInputs(data[0]);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const editCustomer = async data => {
		try {
			await fetch(`http://localhost:3001/customers/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(response => {
				navigate('/klienci');
			});
		} catch (error) {
			console.error(error);
		}
	};

	const removeCustomer = async id => {
		try {
			await fetch(`http://localhost:3001/customer/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(response => {
				navigate('/klienci');
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCustomer(id);
	}, [getCustomer, id]);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleEditSubmit = event => {
		event.preventDefault();
		editCustomer(inputs);
		alert('Pomyślnie edytowano dane!');
	};

	const handleRemoveCustomer = event => {
		event.preventDefault();
		if (window.confirm('Czy na pewno chcesz usunąć klienta?')) {
			removeCustomer(id);
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
					defaultValue: inputs.id_customer,
				}}
			/>
			<Input
				label="Imię"
				input={{
					id: `edit-input-name`,
					type: 'text',
					name: 'name',
					defaultValue: inputs.name,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Nazwisko"
				input={{
					id: `edit-input-surname`,
					type: 'text',
					name: 'surname',
					defaultValue: inputs.surname,
					onChange: handleChange,
				}}
			/>

			<Input
				label="Numer personalny"
				input={{
					id: `edit-input-personal-id-number`,
					type: 'text',
					name: 'personal_id_number',
					defaultValue: inputs.personal_id_number,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer telefonu"
				input={{
					id: `edit-input-phone`,
					type: 'text',
					name: 'phone_number',
					defaultValue: inputs.phone_number,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Email"
				input={{
					id: `edit-input-email`,
					type: 'email',
					name: 'email',
					defaultValue: inputs.email,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Ulica"
				input={{
					id: `edit-input-street`,
					type: 'text',
					name: 'street',
					defaultValue: inputs.street,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Miasto"
				input={{
					id: `edit-input-city`,
					type: 'text',
					name: 'city',
					defaultValue: inputs.city,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Kod pocztowy"
				input={{
					id: `edit-input-post-code`,
					type: 'text',
					name: 'post_code',
					defaultValue: inputs.post_code,
					onChange: handleChange,
				}}
			/>
			<Gender
				label="Płeć"
				defaultValue={inputs.id_gender}
				optionValue={inputs.gender}
				gender={{
					id: `edit-input-gender`,
					name: 'id_gender',
					onChange: handleChange,
				}}
			/>
			<Region
				label="Województwo"
				defaultValue={inputs.id_region}
				optionValue={inputs.region}
				region={{
					id: `edit-input-region`,
					name: 'id_region',
					onChange: handleChange,
				}}
			/>
			<button type="submit">Edytuj</button>
			<button type="button" onClick={handleRemoveCustomer}>
				Usuń
			</button>
		</form>
	);
};

export default EditCustomerForm;
