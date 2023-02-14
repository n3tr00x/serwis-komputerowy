const Producers = props => {
	return (
		<div>
			<label htmlFor={props.producers.id}>{props.label}</label>
			<select {...props.producers}>
				<option hidden>{props.optionValue}</option>
				<option value="1">HP</option>
				<option value="2">MSI</option>
				<option value="3">Samsung</option>
				<option value="4">Dell</option>
				<option value="5">Apple</option>
				<option value="6">LG</option>
				<option value="7">Brother</option>
				<option value="8">Xiaomi</option>
				<option value="9">ASUS</option>
				<option value="10">Gigabyte</option>
				<option value="11">bequiet!</option>
				<option value="12">Thermaltake</option>
				<option value="13">SeaSonic</option>
				<option value="14">NVIDIA</option>
				<option value="15">AMD</option>
				<option value="16">Toshiba</option>
				<option value="17">WD</option>
				<option value="18">Intel</option>
			</select>
		</div>
	);
};

export default Producers;
