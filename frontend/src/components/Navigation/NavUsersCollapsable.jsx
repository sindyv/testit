import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import UserSvg from '../../assets/svg/UserSvg.jsx'

import ArrowDownSvg from '../../assets/svg/ArrowDownSvg.jsx'

function NavUsersCollapsable() {
	return (
		<li className='nav-item m-2'>
			<a
				className='nav-link text-dark p-0 m-0'
				data-bs-toggle='collapse'
				href='#users-collapse'
				role='button'
				aria-expanded='false'
				aria-controls='project-collapse'
			>
				<div className='d-flex justify-content-between align-items-center me-4'>
					<div className='nav-link d-flex gap-2 align-items-center text-dark'>
						<UserSvg />
						Brukere
					</div>
					<ArrowDownSvg />
				</div>
			</a>
			<div className='collapse' id='users-collapse'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<NavLink
							className='nav-link text-dark'
							to={`/users`}
							end
						>
							<span className='ms-4'>Oversikt</span>
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink
							end
							className='nav-link text-dark'
							to={`/users/add`}
						>
							<div className='d-flex gap-2 align-items-center'>
								<span className='ms-4'>Legg til</span>
							</div>
						</NavLink>
					</li>
				</ul>
			</div>
		</li>
	)
}

export default NavUsersCollapsable
