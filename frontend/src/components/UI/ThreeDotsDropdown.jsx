import React from 'react'

import ThreeDotsVertical from '../../assets/svg/ThreeDotsVertical'

function ThreeDotsDropdown() {
	return (
		<div className='dropdown'>
			<a type='button' data-bs-toggle='dropdown' aria-expanded='false'>
				<ThreeDotsVertical />
			</a>
			<ul className='dropdown-menu m-0 p-0'>
				<li className='m-0 p-0'>
					<a className='dropdown-item' href='#'>
						Deaktiver
					</a>
				</li>
			</ul>
		</div>
	)
}

export default ThreeDotsDropdown
