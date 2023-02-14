const Status = props => {
	return (
		<div>
			<label htmlFor={props.status.id}>{props.label}</label>
			<select {...props.status}>
				<option hidden>{props.optionValue}</option>
				<option value="przyjęty">przyjęty</option>
				<option value="w trakcie realizacji">
					w trakcie realizacji
				</option>
				<option value="gotowy do odebrania">gotowy do odebrania</option>
			</select>
		</div>
	);
};

export default Status;
