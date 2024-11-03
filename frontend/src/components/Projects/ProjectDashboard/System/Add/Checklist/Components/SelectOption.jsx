import React from "react"
import { Badge } from "react-bootstrap"

function SelectOption({ option, removeSelectOption }) {
	console.log(option)
	return (
		<Badge bg='light' text='dark' className='fw-light me-2 align-items-center'>
			{option.optionText}{" "}
			<Badge
				bg='secondary'
				className='ms-4 fw-light cursor-pointer'
				role='button'
				onClick={() => removeSelectOption(option.id)}
			>
				X
			</Badge>
		</Badge>
	)
}

export default SelectOption
