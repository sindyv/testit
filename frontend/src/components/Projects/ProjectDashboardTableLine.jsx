import React from 'react'

import ThreeDotsDropdown from '../UI/ThreeDotsDropdown'

import styles from './ProjectDashboard.module.css'

function ProjectDashboardTableLine() {
	return (
		<tr>
			<td>
				<div>
					<div className='fw-medium'>Lærdal Gjenværende</div>
					<div className={`${styles.subtitle}`}>
						Tanke Svilands gate 34
					</div>
				</div>
			</td>
			<td>2024-01-27</td>
			<td className=''>
				<span className='badge text-bg-light fw-medium fs-6'>
					Sindre
				</span>
				<span className='badge text-bg-light fw-medium fs-6'>Egil</span>
				<span className='badge text-bg-light fw-medium fs-6'>
					Jakob
				</span>
			</td>
			<td>
				<span className='badge text-bg-info fw-medium fs-6'>
					Ikke startet
				</span>
			</td>
			<td>13/29</td>
			<td>
				<div className='d-flex justify-content-between'>
					<span>11</span>
					<span>
						<ThreeDotsDropdown />
					</span>
				</div>
			</td>
		</tr>
	)
}

export default ProjectDashboardTableLine
