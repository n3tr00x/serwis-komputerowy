const EmployeeTypeList = props => {
	return (
		<div>
			<label htmlFor={props.employee.id}>{props.label}</label>
			<select {...props.employee}>
				<option hidden>{props.optionValue}</option>
				<option value="1">manager</option>
				<option value="2">serwisant</option>
				<option value="3">administrator</option>
			</select>
		</div>
	);
};

export default EmployeeTypeList;
