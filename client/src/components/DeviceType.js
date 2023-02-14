const DeviceType = props => {
	return (
		<div>
			<label htmlFor={props.device.id}>{props.label}</label>
			<select {...props.device}>
				<option hidden>{props.optionValue}</option>
				<option value="1">PC</option>
				<option value="2">laptop</option>
				<option value="3">drukarka</option>
				<option value="4">smartfon</option>
				<option value="5">tablet</option>
				<option value="6">płyta główna</option>
				<option value="7">zasilacz</option>
				<option value="8">karta graficzna</option>
				<option value="9">dysk HDD</option>
				<option value="10">dysk SSD</option>
				<option value="11">procesor</option>
			</select>
		</div>
	);
};

export default DeviceType;
