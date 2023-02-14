const CustomersList = props => {
	return (
		<div>
			<label htmlFor={props.attributes.id}>{props.label}</label>
			<select {...props.attributes}>
				<option hidden>{props.optionValue}</option>
				{props.customers.map(customer => (
					<option
						key={customer.id_customer}
						value={
							customer.id_customer
						}>{`${customer.name} ${customer.surname}`}</option>
				))}
			</select>
		</div>
	);
};

export default CustomersList;
