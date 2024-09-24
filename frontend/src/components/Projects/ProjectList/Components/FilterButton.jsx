import React from 'react'

function FilterButton({ onClick, filter, buttonText, buttonActiveText }) {
	return (
		<button
			className={`btn badge ${
				filter.button === buttonActiveText
					? 'text-bg-primary'
					: 'text-bg-secondary'
			}  p-2`}
			onClick={onClick}
		>
			{buttonText}
		</button>
	)
}

export default FilterButton
