import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

const headers = {
	id: 'ID',
	login: 'Login',
	email: 'Email',
	name: 'Imię i nazwisko',
	type: 'Typ',
};

const AdminPanelTable = ({ data }) => {
	const navigate = useNavigate();

	const showDetails = id => {
		navigate(`/pracownicy/${id}`);
	};

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{Object.values(headers).map((header, index) => {
						return <th key={index}>{header}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => {
					const {
						id_user,
						login,
						email,
						name_and_surname,
						employee_type,
					} = row;

					return (
						<tr key={index} onClick={() => showDetails(id_user)}>
							<td>{id_user}</td>
							<td>{login}</td>
							<td>{email}</td>
							<td>{name_and_surname}</td>
							<td>{employee_type}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default AdminPanelTable;
