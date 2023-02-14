const Region = props => {
	return (
		<div>
			<label htmlFor={props.region.id}>{props.label}</label>
			<select {...props.region}>
				<option hidden>{props.optionValue}</option>
				<option value="1">dolnośląskie</option>
				<option value="2">kujawsko-pomorskie</option>
				<option value="3">lubelskie</option>
				<option value="4">łódzkie</option>
				<option value="5">lubuskie</option>
				<option value="6">małopolskie</option>
				<option value="7">mazowieckie</option>
				<option value="8">opolskie</option>
				<option value="9">podkarpackie</option>
				<option value="10">podlaskie</option>
				<option value="11">pomorskie</option>
				<option value="12">śląskie</option>
				<option value="13">świętokrzyskie</option>
				<option value="14">warmińsko-mazurskie</option>
				<option value="15">wielkopolskie</option>
				<option value="16">zachodniopomorskie</option>
			</select>
		</div>
	);
};

export default Region;
