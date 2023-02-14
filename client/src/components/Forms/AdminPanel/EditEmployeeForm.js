import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Input';
import EmployeeTypeList from '../../EmployeeTypeList';

const EditEmployeeForm = () => {
	const [inputs, setInputs] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const getEmployee = useCallback(async id => {
		try {
			const response = await fetch(
				`http://localhost:3001/employees/${id}`
			);
			if (!response.ok) throw new Error('coś poszło nie tak');

			const data = await response.json();
			setInputs(data[0]);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const editEmployee = async data => {
		try {
			await fetch(`http://localhost:3001/employees/${id}`, {
				method: 'PUT',
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

	const removeEmployee = async id => {
		try {
			await fetch(`http://localhost:3001/employees/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(response => {
				navigate('/pracownicy');
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getEmployee(id);
	}, [getEmployee, id]);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleEditSubmit = event => {
		event.preventDefault();
		editEmployee(inputs);
		alert('Pomyślnie edytowano dane!');
	};

	const handleRemoveCustomer = event => {
		event.preventDefault();
		if (window.confirm('Czy na pewno chcesz usunąć konto?')) {
			removeEmployee(id);
		}
	};

	return (
		<form onSubmit={handleEditSubmit}>
			<Input
				label="Login"
				input={{
					id: `edit-input-login`,
					type: 'text',
					name: 'login',
					defaultValue: inputs.login,
					onChange: handleChange,
				}}
			/>

			<Input
				label="Hasło"
				input={{
					id: `edit-input-password`,
					type: 'password',
					name: 'password',
					defaultValue: '',
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
			<EmployeeTypeList
				label="Typ pracownika"
				defaultValue={inputs.id_employee_type}
				optionValue={inputs.employee_type}
				employee={{
					id: `add-input-employee-type`,
					name: `id_employee_type`,
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

export default EditEmployeeForm;
