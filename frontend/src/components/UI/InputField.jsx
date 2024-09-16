function InputField({ className, type, id, label, register, disabled }) {
	return (
		<div className={className}>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				{...register(`${id}`)}
				type={type}
				className='form-control'
				disabled={disabled}
			/>
		</div>
	)
}

export default InputField
