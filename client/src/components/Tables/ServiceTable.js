import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

const headers = {
	id: 'ID',
	deviceName: 'Nazwa urządzenia',
	customerName: 'Klient',
	login: 'Login',
	status: 'Status',
};

const ServiceTable = ({ data }) => {
	const navigate = useNavigate();

	const showDetails = id => {
		navigate(`/serwis/${id}`);
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
					const { id_repair, name, login, customer_name, status } =
						row;

					return (
						<tr key={index} onClick={() => showDetails(id_repair)}>
							<td>{id_repair}</td>
							<td>{name}</td>
							<td>{customer_name}</td>
							<td>{login}</td>
							<td>{status}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ServiceTable;
