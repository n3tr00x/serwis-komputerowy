const Textarea = props => {
	return (
		<div>
			<label htmlFor={props.attributes.id}>{props.label}</label>
			<textarea {...props.attributes}></textarea>;
		</div>
	);
};

export default Textarea;
