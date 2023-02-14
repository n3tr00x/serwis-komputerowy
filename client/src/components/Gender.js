const Gender = props => {
	return (
		<div>
			<label htmlFor={props.gender.id}>{props.label}</label>
			<select {...props.gender}>
				<option hidden>{props.optionValue}</option>
				<option value="1">kobieta</option>
				<option value="2">mężczyzna</option>
				<option value="3">inne</option>
			</select>
		</div>
	);
};

export default Gender;
