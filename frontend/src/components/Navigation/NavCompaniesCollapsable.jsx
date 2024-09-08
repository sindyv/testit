import React from 'react'

import { Link, NavLink } from 'react-router-dom'

import BuildingSvg from '../../assets/svg/BuildingSvg.jsx'
import ArrowDownSvg from '../../assets/svg/ArrowDownSvg.jsx'
import CompanySvg from '../../assets/svg/CompanySvg.jsx'

function NavCompaniesCollapsable() {
	return (
		<li className='nav-item m-2'>
			<a
				className='nav-link text-dark p-0 m-0'
				data-bs-toggle='collapse'
				href='#company-collapse'
				role='button'
				aria-expanded='false'
				aria-controls='company-collapse'
			>
				<div className='d-flex justify-content-between align-items-center me-4'>
					<div className='nav-link d-flex gap-2 align-items-center text-dark'>
						<CompanySvg />
						Bedrift
					</div>
					<ArrowDownSvg />
				</div>
			</a>
			<div className='collapse' id='company-collapse'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<NavLink
							className='nav-link text-dark'
							to={`/company`}
							end
						>
							<span className='ms-4'>Din bedrift</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</li>
	)
}

export default NavCompaniesCollapsable
