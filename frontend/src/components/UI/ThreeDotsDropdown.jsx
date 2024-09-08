import React from 'react'

import ThreeDotsVertical from '../../assets/svg/ThreeDotsVertical'

function ThreeDotsDropdown({ menuItems = [] }) {
	return (
		<div className='dropdown'>
			<a type='button' data-bs-toggle='dropdown' aria-expanded='false'>
				<ThreeDotsVertical />
			</a>
			<ul className='dropdown-menu m-0 p-0'>
				{menuItems.map((item) => {
					return (
						<li className='m-0 p-0' key={item.title}>
							<div
								role='button'
								className='dropdown-item'
								onClick={item.function}
							>
								{item.title}
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ThreeDotsDropdown
