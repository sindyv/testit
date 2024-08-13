import React, { useState } from 'react'

function InputField({ className, type, id, label }) {
	// const [data, setData] = useState("")

	return (
		<div className={className}>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				// value={data}
				type={type}
				className='form-control'
				id={id}
				name={id}
				// onChange={(e) => setData(e.target.value)}
			/>
		</div>
	)
}

export default InputField
