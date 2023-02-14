import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

const headers = {
	id: 'ID',
	name: 'Nazwa',
	producer: 'Producent',
	serialNumber: 'Numer seryjny',
};

const SparePartsTable = ({ data }) => {
	const navigate = useNavigate();

	const showDetails = id => {
		navigate(`/czesci/${id}`);
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
					const { id_spare_parts, name, type, serial_number } = row;
					return (
						<tr
							key={index}
							onClick={() => showDetails(id_spare_parts)}>
							<td>{id_spare_parts}</td>
							<td>{name}</td>
							<td>{type}</td>
							<td>{serial_number}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default SparePartsTable;
