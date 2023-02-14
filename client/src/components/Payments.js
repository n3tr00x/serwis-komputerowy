const Payments = props => {
	return (
		<div>
			<label htmlFor={props.payment.id}>{props.label}</label>
			<select {...props.payment}>
				<option hidden>{props.optionValue}</option>
				<option value="1">BLIK</option>
				<option value="2">karta</option>
				<option value="3">przelew</option>
				<option value="4">Google Pay</option>
				<option value="5">Apple Pay</option>
				<option value="6">gotówka</option>
			</select>
		</div>
	);
};

export default Payments;
