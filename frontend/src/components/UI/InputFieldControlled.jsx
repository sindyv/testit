import React, { useState } from 'react'

function InputFieldControlled({
	className,
	type,
	id,
	label,
	data = '',
	setData,
	disabled = false,
}) {
	return (
		<div className={className}>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				value={data}
				type={type}
				className='form-control'
				id={id}
				name={id}
				onChange={(e) =>
					setData((prev) => ({ ...prev, [id]: e.target.value }))
				}
				disabled={disabled}
			/>
		</div>
	)
}

export default InputFieldControlled
