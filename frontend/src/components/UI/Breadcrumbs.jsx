import React from 'react'
import { useMatches, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

function Breadcrumbs() {
	let matches = useMatches()
	const { user } = useAuthContext()
	const navigate = useNavigate()
	let crumbs = matches
		// first get rid of any matches that don't have handle and crumb
		.filter((match) => Boolean(match.handle?.crumb))
		// now map them into an array of elements, passing the loader
		// data to each one
		.map((match) => match.handle.crumb(match.data))

	const handleAddBtn = (action) => {
		if (action === 'project') {
			navigate('projects/new')
		} else if (action === 'user') {
			navigate('users/add')
		}
	}
	return (
		<div className='d-flex justify-content-between'>
			<div className='d-flex flex-row'>
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb'>
						{crumbs.map((crumb, index) => {
							if (index === crumbs.length - 1) {
								return (
									<li className='breadcrumb-item' key={index}>
										{crumb}
									</li>
								)
							} else {
								return (
									<li
										className='breadcrumb-item active'
										key={index}
										aria-current='page'
									>
										{crumb}
									</li>
								)
							}
						})}
					</ol>
				</nav>
			</div>

			{user.enabled && (
				<div>
					<div className='dropdown'>
						<button
							className='btn btn-primary dropdown-toggle'
							type='button'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							Legg til
						</button>
						<ul className='dropdown-menu'>
							<li>
								<div
									onClick={() => handleAddBtn('project')}
									className='dropdown-item'
									role='button'
									href='#'
								>
									Prosjekt
								</div>
							</li>
							<li>
								<div
									onClick={() => handleAddBtn('user')}
									className='dropdown-item'
									role='button'
									href='#'
								>
									Bruker
								</div>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default Breadcrumbs
