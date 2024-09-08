import React from 'react'

import ProjectListTableLine from './ProjectListTableLine'

function ProjectList() {
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
						<ProjectListTableLine />
						<ProjectListTableLine />
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ProjectList
