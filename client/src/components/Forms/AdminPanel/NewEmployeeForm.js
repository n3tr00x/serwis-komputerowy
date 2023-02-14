import { useState } from 'react';
import Input from '../../Input';
import Gender from '../../Gender';
import Region from '../../Region';
import { useNavigate } from 'react-router-dom';
import EmployeeTypeList from '../../EmployeeTypeList';

const NewEmployeeForm = () => {
	const [inputs, setInputs] = useState({
		name: '',
		surname: '',
		personal_id_number: '',
		phone_number: '',
		email: '',
		street: '',
		city: '',
		post_code: '',
		id_gender: '',
		id_region: '',
		id_employee_type: '',
	});

	const navigate = useNavigate();

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const addEmployee = async data => {
		try {
			await fetch(`http://localhost:3001/employees`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(response => {
				navigate('/pracownicy');
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleOnSubmit = event => {
		event.preventDefault();

		if (
			inputs.name === '' ||
			inputs.surname === '' ||
			inputs.personal_id_number === '' ||
			inputs.phone_number === '' ||
			inputs.street === '' ||
			inputs.city === '' ||
			inputs.post_code === '' ||
			inputs.id_gender === '' ||
			inputs.id_region === '' ||
			inputs.id_employee_type === ''
		) {
			alert('Wprowadź poprawne dane');
		} else {
			addEmployee(inputs);
			setInputs({});
			event.target.reset();
			alert('Pomyślnie dodano pracownika');
		}
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<Input
				label="Imię"
				input={{
					id: `add-input-name`,
					type: 'text',
					name: 'name',
					defaultValue: inputs.name,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Nazwisko"
				input={{
					id: `add-input-surname`,
					type: 'text',
					name: 'surname',
					defaultValue: inputs.surname,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer personalny"
				input={{
					id: `add-input-personal-id-number`,
					type: 'text',
					name: 'personal_id_number',
					defaultValue: inputs.personal_id_number,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Numer telefonu"
				input={{
					id: `add-input-phone`,
					type: 'text',
					name: 'phone_number',
					defaultValue: inputs.phone_number,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Email"
				input={{
					id: `add-input-email`,
					type: 'email',
					name: 'email',
					defaultValue: inputs.email,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Ulica"
				input={{
					id: `add-input-street`,
					type: 'text',
					name: 'street',
					defaultValue: inputs.street,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Miasto"
				input={{
					id: `add-input-city`,
					type: 'text',
					name: 'city',
					defaultValue: inputs.city,
					onChange: handleChange,
				}}
			/>
			<Input
				label="Kod pocztowy"
				input={{
					id: `add-input-post-code`,
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
					id: `add-input-gender`,
					name: 'id_gender',
					onChange: handleChange,
				}}
			/>
			<Region
				label="Województwo"
				defaultValue={inputs.id_region}
				optionValue={inputs.region}
				region={{
					id: `add-input-region`,
					name: 'id_region',
					onChange: handleChange,
				}}
			/>
			<EmployeeTypeList
				label="Typ pracownika"
				defaultValue={inputs.id_employee_type}
				optionValue={inputs.id_employee_type}
				employee={{
					id: `add-input-employee-type`,
					name: `id_employee_type`,
					onChange: handleChange,
				}}
			/>
			<button type="submit">Dodaj</button>
		</form>
	);
};

export default NewEmployeeForm;
