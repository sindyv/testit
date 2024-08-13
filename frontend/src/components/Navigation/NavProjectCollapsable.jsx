import React from 'react'

import { Link, NavLink } from 'react-router-dom'

import BuildingSvg from '../../assets/svg/BuildingSvg.jsx'
import ArrowDownSvg from '../../assets/svg/ArrowDownSvg.jsx'

function NavProjectCollapsable() {
	return (
		<li className='nav-item m-2'>
			<a
				className='nav-link text-dark p-0 m-0'
				data-bs-toggle='collapse'
				href='#project-collapse'
				role='button'
				aria-expanded='false'
				aria-controls='project-collapse'
			>
				<div className='d-flex justify-content-between align-items-center me-4'>
					<div className='nav-link d-flex gap-2 align-items-center text-dark'>
						<BuildingSvg />
						Prosjekter
					</div>
					<ArrowDownSvg />
				</div>
			</a>
			<div className='collapse' id='project-collapse'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<NavLink
							className='nav-link text-dark'
							to={`/projects`}
						>
							<span className='ms-4'>Oversikt</span>
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink
							className='nav-link text-dark'
							to={`/project-new`}
						>
							<div className='d-flex gap-2 align-items-center'>
								<span className='ms-4'>Opprett nytt</span>
							</div>
						</NavLink>
					</li>
				</ul>
			</div>
		</li>
	)
}

export default NavProjectCollapsable
