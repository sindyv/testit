import React, { useState } from "react"

function InputFieldControlled({
	className,
	type,
	id,
	label,
	data = "",
	setData,
}) {
	return (
		<div className={className}>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				value={data}
				type={type}
				className="form-control"
				id={id}
				name={id}
				onChange={(e) => setData((prev) => ({ ...prev, [id]: e.target.value }))}
			/>
		</div>
	)
}

export default InputFieldControlled
