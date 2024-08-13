import React from 'react'

import ProjectDashboardTableLine from './ProjectDashboardTableLine'

function ProjectDashboard() {
	return (
		<div className='card shadow rounded-4 mt-5'>
			<div className='card-body'>
				<h3>Prosjekter</h3>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Prosjekt</th>
							<th scope='col'>Sluttdato</th>
							<th scope='col'>Deltakere</th>
							<th scope='col'>Status</th>
							<th scope='col'>Tester</th>
							<th scope='col'>Avvik</th>
						</tr>
					</thead>
					<tbody>
						<ProjectDashboardTableLine />
						<ProjectDashboardTableLine />
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ProjectDashboard
