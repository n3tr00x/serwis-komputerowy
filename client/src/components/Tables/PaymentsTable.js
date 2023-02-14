import styles from './Table.module.css';

const headers = {
	id: 'ID',
	customerName: 'Klient',
	payment: 'Płatność',
	personalIdNumber: 'Numer personalny',
	type: 'Typ płatności',
};

const PaymentsTable = ({ data }) => {
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
						id_payment,
						payment,
						name_and_surname,
						personal_id_number,
						payment_type,
					} = row;

					return (
						<tr key={index}>
							<td>{id_payment}</td>
							<td>{name_and_surname}</td>
							<td>{payment}</td>
							<td>{personal_id_number}</td>
							<td>{payment_type}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default PaymentsTable;
