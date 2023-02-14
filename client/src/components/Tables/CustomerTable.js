import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

const headers = {
	id: 'ID',
	name: 'Imię',
	surname: 'Nazwisko',
	personalId: 'Numer personalny',
	phoneNumber: 'Numer telefonu',
	email: 'Email',
};

const CustomerTable = ({ data }) => {
	const navigate = useNavigate();

	const showDetails = id => {
		navigate(`/klienci/${id}`);
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
						id_customer,
						name,
						surname,
						personal_id_number,
						phone_number,
						email,
					} = row;
					return (
						<tr
							key={index}
							onClick={() => showDetails(id_customer)}>
							<td>{id_customer}</td>
							<td>{name}</td>
							<td>{surname}</td>
							<td>{personal_id_number}</td>
							<td>{phone_number}</td>
							<td>{email}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CustomerTable;
